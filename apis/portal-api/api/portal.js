const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/app-attack');
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pt_resources = require('./models/pt-resources');
const bodyParser = require('body-parser');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'App-Attack',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000/'
            }
        ]
    },
    apis: ['./portal.js']
}

const app = express();
const port = 5000;

const swaggerSpec = swaggerJSDOC(options);
app.use('/portal/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * @swagger
 *  components:
 *      schemas:
 *          pen-test-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  created:
 *                      type: date
 *                  level:
 *                      type: number
 *                  description:
 *                      type: string
 *                  time_taken_to_complete:
 *                      type: string
 *                  url:
 *                      type: string
 */

app.get('/portal/api-test', (req, res) => {
    res.send('The API is working!');
});

app.get('/portal/pt-resources/beginner', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 0 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

app.get('/portal/pt-resources/intermediate', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 1 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

app.get('/portal/pt-resources/advanced', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 2 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

app.post('/portal/pt-resources', async (req, res) => {
    try {
        console.log(req.body);
        const { name, level, description, time_taken_to_complete, url } = req.body;

        const created = Date.now();

        const request = req.body;

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 5) {
            run = false;
        }

        console.log(Object.keys(request).length);

        for (const element in request) {
            if (request.hasOwnProperty(element) && request[element].length == 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            const new_resource = new pt_resources({
                name,
                created,
                level,
                description,
                time_taken_to_complete,
                url
            });

            const insert = await pt_resources.create(new_resource);

            if (insert != null) {
                res.status(200).send("New Resource Adding Operation Sucessfully");
            } else {
                res.status(409).send("New Resource Adding Operation Failed");
            }
        } else if (!run) {
            res.status(409).send("Request is empty or a field is empty or missing");
        }

    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
});

app.delete('/portal/pt-resources', async (req, res) => {
    try {
        const { name, level } = req.body;

        const request = req.body;
        console.log(request);

        var run = true;

        if (Object.keys(request).length === 0 || Object.keys(request).length < 2) {
            run = false;
        }

        console.log(Object.keys(request).length);

        for (const element in request) {
            if (request.hasOwnProperty(element) && request[element].length === 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            const query = {
                name,
                level
            }

            const del = await pt_resources.findOneAndDelete(query);

            if (del != null) {
                res.status(200).send("RESOURCE DELETED");
            } else {
                res.status(409).send("RESOURCE NOT DELETED");
            }
        } else if (!run) {
            res.status(409).send("Request is empty or a field is empty or missing");
        }

    } catch (error) {
        console.log(`Error ${error}`);
        res.status(409).send(`Error ${error}`);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});