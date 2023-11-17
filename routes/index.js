import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Pega o URL do arquivo e transforma ele no caminho para esse arquivo

const router = express.Router();

router.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, '..', 'public', 'html', 'homePage.html');

    // Read the HTML file
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // Send the HTML content as the response
            res.send(data);
        }
    });
});

export {
    router
}