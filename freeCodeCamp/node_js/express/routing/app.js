import  express  from 'express';
import usersRouter from './routes/users.mjs';
import productRouter from './routes/products.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;
// Get the directory containing app.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Serve files from public directory
app.use(express.static(path.join(__dirname, 'public')));
//Use the routers
app.use('/users', usersRouter);
app.use('/products', productRouter);

usersRouter.get('/', (req, res) =>{
    res.sendFile('users.html', {
        root : './public'
    });
});
productRouter.get('/', (req, res) => {
    res.sendFile('products.html', {
        root : './public'
    });
});
app.get('/', (req, res) =>{
    res.send('Main app home page');
});
app.listen(port, () => {
    console.log(`Example app listening  at \ 
        http://localhost:${port}`);
});