import express from 'express';
import { router } from 'express.Router';
//MW specific for this rowter
router.use((req, res, next) =>{
    console.log('Users router time: ', Date.now());
    next;
});
//Define routes
router.get('/', (req, res) =>{
    res.send('Users home page');
});
router.get('/:id', (req, res) =>{
    res.send(`User profile for ID: ${req.params.id}`);
})
export {router};