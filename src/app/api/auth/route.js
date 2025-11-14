// route.js  (mounted at /api/auth)
import express from "express";
import { ManagementClient } from "auth0";

const router = express.Router();

const management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_MGMT_CLIENT_ID,
  clientSecret: process.env.AUTH0_MGMT_CLIENT_SECRET,
  scope: "create:users read:users",
});

router.post("/", async (req, res) => {
  const { action, email, password, firstName, lastName } = req.body;

  try {
    if (action === "signup") {
      // 1. Prevent duplicate email
      const existing = await management.getUsersByEmail(email).catch(() => []);
      if (existing.length) {
        return res.status(400).json({ error: "Email already in use." });
      }

      // 2. Create user (verified = true → can login immediately)
      await management.createUser({
        connection: "Username-Password-Authentication",
        email,
        password,
        name: `${firstName} ${lastName}`,
        email_verified: true,
      });

      return res.json({ success: true });
    }

    // login action – nothing to do here (handled by SPA)
    res.json({ success: true });
  } catch (err) {
    console.error("Auth API error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
