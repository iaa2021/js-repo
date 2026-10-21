import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();
//Get the path to public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
//Products list
router.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'products.html'));
});
router.get('/:id', (req, res) =>{
    res.send(`
        <h2>Product Details</h2>
        <p>Product ID: ${req.params.id}</p>
        <p><a href="/products">Back to products</a></p>
        `);
});

export default  router;