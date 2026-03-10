import { verifyToken } from "@clerk/backend";

const isFounder = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    
    const userId = payload.sub;

    // In production, enforce FOUNDER_USER_ID. 
    // If not set, we allow it for local development only, but log a loud warning.
    const founderId = process.env.FOUNDER_USER_ID;
    
    if (founderId && userId !== founderId) {
       console.warn(`[SECURITY] Unauthorized SuperAdmin access attempt by user: ${userId}`);
       return res.status(403).json({ error: "Forbidden: Super Admin Access Required" });
    }

    if (!founderId) {
        console.warn("[SECURITY WARN] FOUNDER_USER_ID is not set in .env! Allowing superadmin access for development.");
    }

    req.auth = {
      userId,
    };

    next();
  } catch (err) {
    console.error("Founder verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default isFounder;
