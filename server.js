// server.js   ← put this in your project root (next to package.json)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

// Load .env.local
dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

// Pull variables from .env.local
const DOMAIN = process.env.AUTH0_DOMAIN;
const MGMT_ID = process.env.AUTH0_MGMT_CLIENT_ID;
const MGMT_SECRET = process.env.AUTH0_MGMT_CLIENT_SECRET;
const SPA_ID = process.env.AUTH0_SPA_CLIENT_ID;

// Check if all are loaded
if (!DOMAIN || !MGMT_ID || !MGMT_SECRET || !SPA_ID) {
  console.error("Missing Auth0 env vars! Check .env.local");
  process.exit(1);
}

// Your API route
app.post("/api/auth", async (req, res) => {
  const { action, email, password, firstName, lastName } = req.body;

  try {
    // 1. Get Management API token
    const tokenRes = await fetch(`https://${DOMAIN}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: MGMT_ID,
        client_secret: MGMT_SECRET,
        audience: `https://${DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      }),
    });

    if (!tokenRes.ok) throw new Error("Failed to get management token");
    const { access_token } = await tokenRes.json();

    // 2. SIGNUP → create user in Auth0
    if (action === "signup") {
      const createRes = await fetch(`https://${DOMAIN}/api/v2/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          connection: "Username-Password-Authentication",
          email,
          password,
          user_metadata: { first_name: firstName, last_name: lastName },
          email_verified: false,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.message || "Failed to create user");
      }
    }

    // 3. LOGIN → get JWT using password grant
    const loginRes = await fetch(`https://${DOMAIN}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        grant_type: "password",
        client_id: SPA_ID,
        username: email,
        password,
        audience: `https://${DOMAIN}/api/v2/`,
        scope: "openid profile email",
      }),
    });

    if (!loginRes.ok) {
      const err = await loginRes.json();
      throw new Error(err.error_description || "Login failed");
    }

    const loginData = await loginRes.json();
    res.json({ id_token: loginData.id_token });
  } catch (error) {
    console.error("Auth error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth server running at http://localhost:${PORT}`);
  console.log(`Call it from React: fetch('/api/auth', ...)`);
});
