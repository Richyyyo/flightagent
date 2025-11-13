// src/app/api/auth/route.js
import { NextResponse } from "next/server";

// Cache Management API token
let managementToken = null;
let tokenExpiry = 0;

const getManagementToken = async () => {
  if (managementToken && Date.now() < tokenExpiry) return managementToken;

  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || "Failed to get token");

  managementToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60000;
  return managementToken;
};

export async function POST(request) {
  const body = await request.json();
  const { action, email, password, firstName, lastName } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  try {
    let id_token;

    if (action === "signup") {
      if (!firstName || !lastName) {
        return NextResponse.json({ error: "Name required" }, { status: 400 });
      }

      const token = await getManagementToken();

      // Create user in Auth0 DB
      const createRes = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            password,
            connection: "Username-Password-Authentication",
            given_name: firstName,
            family_name: lastName,
            name: `${firstName} ${lastName}`,
            verify_email: false,
          }),
        }
      );

      if (!createRes.ok) {
        const err = await createRes.json();
        if (err.message.includes("already exists")) {
          return NextResponse.json({ error: "User exists" }, { status: 409 });
        }
        throw err;
      }

      // Now login to get id_token
      const loginRes = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "password",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            username: email,
            password,
            scope: "openid profile email",
          }),
        }
      );

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error(loginData.error_description);

      id_token = loginData.id_token;
    } else if (action === "login") {
      const res = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "password",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            username: email,
            password,
            scope: "openid profile email",
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }

      id_token = data.id_token;
    }

    return NextResponse.json({ id_token });
  } catch (err) {
    console.error("Auth0 error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
