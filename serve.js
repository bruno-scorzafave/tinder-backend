import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import { URL_CONNECTION } from './sensitiveinformation.js'
import Cards from './dbCards.js'

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = URL_CONNECTION;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send("Hello coder"));

app.post('/tinder/cards', async (req, res) => {
    const dbCard = req.body;

    try {
        const responseCards = await Cards.create(dbCard);
        res.status(200).send(responseCards);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/tinder/cards', async (req, res) => {
    try {
        const cardsResult = await Cards.find();
        res.status(200).send(cardsResult);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Listener
app.listen(port, () => console.log(`listening on port ${port}`));