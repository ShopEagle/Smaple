const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send('Hello ShopEagle');
})

app.listen(3000, ()=> {
    console.log('Running');
})
