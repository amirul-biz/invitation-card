// pages/api/canva/get-token.js
'use server'
import { Buffer } from "buffer";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing 'code' query parameter" });
  }

  const CLIENT_ID = 'amirul329693';
  const CLIENT_SECRET = 'amirul329693';
  const CODE_VERIFIER = 'i541qdcfkb4htnork0w92lnu43en99ls5a48ittv6udqgiflqon8vusojojakbq4'
  const REDIRECT_URI = "https://example.com/process-auth"; // Replace with your actual redirect URI

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    code_verifier: CODE_VERIFIER,
    redirect_uri: REDIRECT_URI,
  });

  try {
    const response = await fetch("https://api.canva.com/rest/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Canva token fetch error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
