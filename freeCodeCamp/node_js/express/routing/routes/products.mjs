import express from 'express';
import { router  } from 'express.Router';
//Define routes
router.get('/', (req, res) => {
    res.send('Products list: ');
});
router.get('/:id', (req, res) =>{
    res.send(`Product details for ID: `, ${req.params.id});
});
export default { router };