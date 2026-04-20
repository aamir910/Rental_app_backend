import { Router } from "express";
import { supabase } from "../supabaseClient.js";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    console.log("[Auth][Signup] Request:", { email, name, phone });

    if (!email || !password || !name || !phone) {
      console.warn("[Auth][Signup] Validation failed: missing required fields");
      return res.status(400).json({
        message: "Email, password, name, and phone are required"
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        }
      }
    });

    if (error) {
      console.error("[Auth][Signup] Supabase error:", error);
      return res.status(400).json({ message: error.message });
    }

    console.log("[Auth][Signup] Success for:", email);
    return res.status(201).json({
      message: "Signup successful",
      user: data.user,
      session: data.session
    });
  } catch (err) {
    console.error("[Auth][Signup] Unexpected error:", err);
    return res.status(500).json({ message: err.message || "Unexpected error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[Auth][Login] Request:", { email });

    if (!email || !password) {
      console.warn("[Auth][Login] Validation failed: email/password required");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("[Auth][Login] Supabase error:", error);
      return res.status(401).json({ message: error.message });
    }

    console.log("[Auth][Login] Success for:", email);
    return res.json({
      message: "Login successful",
      user: data.user,
      session: data.session
    });
  } catch (err) {
    console.error("[Auth][Login] Unexpected error:", err);
    return res.status(500).json({ message: err.message || "Unexpected error" });
  }
});

export default router;
