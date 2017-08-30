const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const db = require('./db.js');
const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("listening on 3000");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data', (req, res) => {
    db.data.findAll().then(function(data) {
        res.json(data);
    }, function(e) {
        res.status(400).json(e);
    });
});

// POST /data
app.post('/data', function(req, res) {
    var body = _.pick(req.body, 'name', 'value');

    db.data.create(body).then(function(data) {
        res.json(data.toJSON());
    }, function (e) {
        res.status(400).json(e);
    });
});

app.put('/data/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'name', 'value');

    db.data.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        if(data) {
            data.update(body).then(function(data) {
                res.json(data.toJSON());
            }, function(e) {
                res.status(400).json(e);
            })
        } else {
            res.status(404).send();
        }
    }, function(e) {
        res.status(500).json(e);
    })
});