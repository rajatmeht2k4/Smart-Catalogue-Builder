import { verifyToken } from "@clerk/backend";

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.auth = {
      userId: payload.sub,
    };

    next();
  } catch (err) {
    console.error("Clerk verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default requireAuth;