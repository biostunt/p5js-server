import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

interface Scoreboard {
    [name: string]: number;
}

const scoreboard: Scoreboard = {};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

app.get('/images/:name', (req, res) => {
    const name = req.params.name;
    res.sendFile(path.resolve(__dirname, `assets/${name}`));
});
app.get('/user/:name', (req, res) => {
    return scoreboard[req.params.name] || { name: req.params.name, score: 0 };
})

app.get('/scoreboard', (req, res) => res.json(Object.entries(scoreboard).map(([k, v]) => ({name: k, score: v}))))
    
app.post('/scoreboard', (req, res) => {
    console.log(req.body)
    let user: { name: string, score: number } = req.body;
    scoreboard[user.name] = user.score;
    res.send({status: 'success'})
});

app.listen(3000, () => console.log('started'));