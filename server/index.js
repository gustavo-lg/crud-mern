const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://newuser:newuser@crud.lm5fzcs.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res)=>{
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({
        foodName: foodName, 
        daysSinceIAte: days
    })
    try{
        await food.save();
    }catch(err){
        console.log(err);
    }
});

app.get('/read', async (req, res)=>{
    FoodModel.find({}, (err, result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
});

app.listen(3001, ()=>{
    console.log('server running on port 3001')
});