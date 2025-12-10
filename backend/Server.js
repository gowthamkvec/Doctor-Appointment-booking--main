// -------------------------------
// Imports
// -------------------------------
import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routers
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// -------------------------------
// App Config
// -------------------------------
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB + Cloudinary
await connectDB();
connectCloudinary();

// -------------------------------
// API Routes
// -------------------------------
app.get("/", (req, res) => {
  res.send("API is LIVE 🚀");
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// -------------------------------
// Server Start (Hosting Safe)
// -------------------------------
const PORT = process.env.PORT || 4000;

// If NOT in production → normal local host
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

// Export the app for serverless platforms (Vercel/Netlify)
export default app;
