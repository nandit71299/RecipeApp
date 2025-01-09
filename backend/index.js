import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connectDb } from "./config/db.js";
dotenv.config();

const app = express();
const corsOptions = {
  origin: ["https://recipe-app-navy-alpha.vercel.app", "http://localhost:3000"], // allow Vercel and local frontend
  methods: "GET,POST,PUT,PATCH,DELETE", // Allow specific methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
  credentials: true, // Allow cookies and credentials if needed
};

app.use(cors(corsOptions)); // Use CORS with the specific options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
connectDb()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
