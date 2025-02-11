import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Set up view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
import indexRouter from "./routes/index.js";
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export { __dirname };
