'use strict';
require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const VONAGE_FROM_NUMBER = process.env.VONAGE_FROM_NUMBER;
const VONAGE_TO_NUMBER = process.env.VONAGE_TO_NUMBER;

const server = app.listen(process.env.PORT || 4004, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.get('/proxy-call', (req, res) => {
    const ncco = [
        {
            'action': 'connect',
            'eventUrl': ['https://18627fc4.ngrok.io/event'],
            'timeout': 45, // the default is 60
            'from': '12066032298',
            'endpoint': [
                {
                    'type': 'phone',
                    'number': '917285086971' // forwarding to this real number
                }
            ]
        }
    ];
    res.json(ncco);
});

app.post('/event', (req, res) => {
    console.log(req.body);
    res.status(204).end();
});