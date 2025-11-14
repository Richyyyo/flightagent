// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ path: ".env.local" });

const app = express();
app.use(cors());
app.use(express.json());

const DOMAIN = process.env.AUTH0_DOMAIN;
const MGMT_ID = process.env.AUTH0_MGMT_CLIENT_ID;
const MGMT_SECRET = process.env.AUTH0_MGMT_CLIENT_SECRET;
const SPA_ID = process.env.AUTH0_SPA_CLIENT_ID;

if (!DOMAIN || !MGMT_ID || !MGMT_SECRET || !SPA_ID) {
  console.error("Missing Auth0 env vars! Check .env.local");
  process.exit(1);
}

app.post("/api/auth", async (req, res) => {
  const { action, email, password, firstName, lastName } = req.body;

  try {
    // === SIGNUP ===
    if (action === "signup") {
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

      const { access_token } = await tokenRes.json();

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
          email_verified: true,
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.message);
      }

      return res.json({ success: true });
    }

    if (action === "login") {
      const loginRes = await fetch(`https://${DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          grant_type: "password",
          client_id: SPA_ID,
          username: email,
          password,
          scope: "openid profile email",
        }),
      });

      const data = await loginRes.json();
      if (!loginRes.ok) throw new Error(data.error_description);

      return res.json({ id_token: data.id_token }); // ← MUST RETURN THIS
    }

    res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Auth server running at http://localhost:${PORT}`);
});
