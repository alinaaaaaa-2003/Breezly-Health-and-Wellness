// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing.");
      return res.status(500).json({ msg: "Server configuration error." });
    }

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ msg: "Invalid token format. Use 'Bearer <token>'" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT verification failed:", err.message);
        return res.status(401).json({ msg: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
      }
      console.log("Decoded JWT payload:", decoded);
      req.user = decoded;
      console.log("User ID from token:", decoded.id); // Attach user info to request object
      next();
    });
  } catch (error) {
    console.error("❌ Middleware error:", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
