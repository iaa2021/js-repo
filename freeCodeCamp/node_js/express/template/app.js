import express from 'express';
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
const items = [
    { id : 1, name : 'Item 1', description: 'First item'},
    { id : 2, name : 'Item 2', description: 'Second item'},
    { id : 3, name : 'Item 3', description: 'Third item'}
]
//Home page
app.get('/', (req, res) => {
    
    res.render('index', {
        title : 'My items',
        items
    });
});
//Individual item page
app.get('/items/:id', (req, res) =>{
    const id = Number(req.params.id);
    const item = items.find(item => item.id === id);
    if(!item){
        return res.status(404).send('Item not found');
    }
    res.render('item', { item });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});