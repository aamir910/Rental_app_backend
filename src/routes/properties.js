import { Router } from "express";
import { supabase } from "../supabaseClient.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    console.log("[Properties] Fetching property list from Supabase");
    const { data, error } = await supabase
      .from("properties")
      .select("id, title, location, price_per_day")
      .order("id", { ascending: true });

    if (error) {
      console.error("[Properties] Supabase error:", error);
      return res.status(500).json({ message: error.message });
    }

    console.log(`[Properties] Success: returned ${data?.length || 0} rows`);
    return res.json(data || []);
  } catch (err) {
    console.error("[Properties] Unexpected error:", err);
    return res.status(500).json({ message: err.message || "Unexpected error" });
  }
});

export default router;
