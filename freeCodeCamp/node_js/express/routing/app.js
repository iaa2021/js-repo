import { express } from express;
import usersRouter from './routes/users.mjs';
import productRouter from './routes/products.mjs';

const app = express();
const port = 3000;
//Use the routers
app.use('users', usersRouter);
app.use('/products', productRouter);

app.get('/', (req, res) =>{
    res.send('Main app home page');
});
app.listen(port, () => {
    console.log(`Example app listening  at \ 
        http://localhost:${port}`);
});