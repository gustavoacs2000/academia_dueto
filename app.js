import express  from "express";
import { router } from "./routes/index.js";
import { loginRoute } from "./routes/login.js";
import { registerRoute } from "./routes/register.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Pega o URL do arquivo e transforma ele no caminho para esse arquivo

const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/login`, loginRoute);
app.use(`/register`, registerRoute);
app.use('/', router);

const server = app.listen(port, (() => {
    console.log(`listening on port ${port}...`);
}));

server.setTimeout(5400);