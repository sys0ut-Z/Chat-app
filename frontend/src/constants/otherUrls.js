const FRONTEND_URL = "http://localhost:5173";
const BACKEND_URL = import.meta.env.NODE_ENV === "development" ? "http://localhost:5001" : "/";

export {
  FRONTEND_URL,
  BACKEND_URL
}