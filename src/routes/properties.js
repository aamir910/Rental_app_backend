import { Router } from "express";
import { supabase } from "../supabaseClient.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select("id, title, location, price_per_day")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.json(data || []);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Unexpected error" });
  }
});

export default router;
