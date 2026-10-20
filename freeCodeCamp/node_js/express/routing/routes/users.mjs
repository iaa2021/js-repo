import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();
//MW specific for this rowter
router.use((req, res, next) =>{
    console.log('Users router time: ', Date.now());
    next();
});
// Get the path to the public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
// Users list: serve users.html
router.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'users.html'));
    });

// User profile: /users/1, /users/2, etc.
router.get('/:id', (req, res) => {
    res.send(`
        <h2>User Profile</h2>
        <p>User ID: ${req.params.id}</p>
        <p><a href="/users">Back to users</a></p>
    `);
});
export default router;