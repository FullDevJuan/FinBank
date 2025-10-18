import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }
    return res.status(403).json({ msg: "Invalid token" });
  }
}

export function verifyRol(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthenticated" });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    next();
  };
}
