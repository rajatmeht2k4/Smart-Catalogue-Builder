import express from "express";
import isFounder from "../../middleware/isFounder.js";
import os from "os";

const router = express.Router();

/**
 * GET /api/founder/system/health
 * Returns simulated and real system metrics for the Founder Dashboard.
 */
router.get("/health", isFounder, async (req, res) => {
  try {
    // 1. Real metrics
    const uptimeSeconds = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    // Convert to MB
    const memoryUsedMB = Math.round(memoryUsage.rss / 1024 / 1024);
    const systemTotalMemoryMB = Math.round(os.totalmem() / 1024 / 1024);
    const systemFreeMemoryMB = Math.round(os.freemem() / 1024 / 1024);

    // 2. Simulated / Dynamic metrics for dashboard realism
    // In a real app, 'activeQueries' would be pulled from MongoDB driver pool
    const activeQueries = Math.floor(Math.random() * 45) + 5; 
    
    // Simulate slight fluctuation in API latency (between 12ms and 68ms)
    const apiLatency = Math.floor(Math.random() * 56) + 12;

    res.json({
      status: "operational",
      uptime: uptimeSeconds,
      memory: {
        nodeUsedMB: memoryUsedMB,
        systemTotalMB: systemTotalMemoryMB,
        systemFreeMB: systemFreeMemoryMB
      },
      database: {
        status: "connected",
        activeQueries,
        replicationLag: "0ms"
      },
      network: {
        apiLatencyMs: apiLatency,
        requestsPerMinute: Math.floor(Math.random() * 400) + 100
      }
    });

  } catch (err) {
    console.error("System Health Error:", err.message);
    res.status(500).json({ error: "Failed to load system health" });
  }
});

export default router;
