const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/app-attack');
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

const pt_resources = require('./models/pt-resources');
const research_resources = require('./models/research-resources');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './resources/research/')
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'App-Attack-Portal-API',
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
 *                  level:
 *                      type: number
 *                  description:
 *                      type: string
 *                  time_taken_to_complete:
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: data
 *          research-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  level:
 *                      type: number
 *                  description:
 *                      type: string
 *                  time_taken_to_complete:
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: data
 */

/**
 * @swagger
 * /portal/api-test:
 *  get:
 *      summary: This endpint is used to test if the API is working
 *      responses:
 *          200:
 *              description: To test GET method
 */
app.get('/portal/api-test', (req, res) => {
    res.send('The API is working!');
});

/**
 * @swagger
 * /portal/pt-resources/week-1:
 *  get:
 *      summary: This api end-point is used to fetch all week 1 resources
 *      description: This api end-point is used to fetch all week 1 resources
 *      responses:
 *          200:
 *              description: Week 1 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/pen-test-resources'
 *          409:
 *              description: Week 3 Resource Not Found
 */
app.get('/portal/pt-resources/week-1', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 0 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/pt-resources/week-2:
 *  get:
 *      summary: This api end-point is used to fetch all week 2 resources
 *      description: This api end-point is used to fetch all week 2 resources
 *      responses:
 *          200:
 *              description: Week 2 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/pen-test-resources'
 *          409:
 *              description: Week 3 Resource Not Found
 */
app.get('/portal/pt-resources/week-2', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 1 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/pt-resources/week-3:
 *  get:
 *      summary: This api end-point is used to fetch all week 3 resources
 *      description: This api end-point is used to fetch all week 3 resources
 *      responses:
 *          200:
 *              description: Week 3 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/pen-test-resources'
 *          409:
 *              description: Week 3 Resource Not Found
 */
app.get('/portal/pt-resources/week-3', async (req, res) => {
    const resource = await pt_resources.find({ 'level': 2 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/pt-resources:
 *  post:
 *      summary: This end-point is used to add new Pen-test resources 
 *      description: This end-point is used to add new Pen-test resources 
 *      parameters:
 *          
 *      requestBody:
 *          required: true
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week:
 *                              type: number
 *                          description:
 *                              type: string
 *                          time_taken_to_complete:
 *                              type: string
 *                          document:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: To test POST method to add Pen-test resources
 *          409:
 *              description: Operation failed or request has a empty field or the entire request is empty
 */
app.post('/portal/pt-resources', async (req, res) => {
    try {
        console.log(req.body);
        const { name, level, description, time_taken_to_complete, url } = req.body;

        //const created = Date.now();

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
                level,
                description,
                time_taken_to_complete,
                url
            });

            const insert = await pt_resources.create(new_resource);

            if (insert != null) {
                res.status(201).send("New Resource Adding Operation Sucessfully");
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

/**
 * @swagger
 * /portal/pt-resources:
 *  delete:
 *      summary: This end-point is used to add new Pen-test resources 
 *      description: This end-point is used to add new Pen-test resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          level:
 *                              type: number
 *      responses:
 *          200:
 *              description: To test DELETE method to delete Pen-test resources
 *          409:
 *              description: Operation failed or request has a empty field or the entire request is empty
 */
app.delete('/portal/pt-resources', async (req, res) => {
    try {
        const { name, level } = req.body;

        const request = req.body;
        console.log(request);

        var run = true;

        if (Object.keys(request).length === 0 || Object.keys(request).length < 2) {
            run = false;
        }

        console.log("delete");

        if (run) {
            console.log(Object.keys(request).length);
        } else {
            console.log("Run is false");
        }

        for (const element in request) {
            if (request.hasOwnProperty(element) && request[element].length === 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            console.log(Object.keys(request).length);
        } else {
            console.log("Run is false");
        }

        if (run) {
            const query = {
                name,
                level
            }

            const del = await pt_resources.findOneAndDelete(query);

            if (del != null) {
                res.status(204).send("Resource is deleted");
            } else {
                res.status(409).send("Resources is not deleted");
            }
        } else if (!run) {
            res.status(409).send("Request is empty or a field is empty or missing");
        }

    } catch (error) {
        console.log(`Error ${error}`);
        res.status(409).send(`Error: ${error}`);
    }
});

/**
 * @swagger
 * /portal/research-resources/upload:
 *  post:
 *      summary: This end-point is used to add new Research resources 
 *      description: This end-point is used to add new Research resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week:
 *                              type: number
 *                          description:
 *                              type: string
 *                          time_taken_to_complete:
 *                              type: string
 *                          document:
 *                              type: string
 *                              format: binary
 *                          
 *      responses:
 *          200:
 *              description: To test POST method to add Research resources
 *          409:
 *              description: Operation failed or request has a empty field or the entire request is empty
 */
app.post('/portal/research-resources/upload', upload.single('document'), async (req, res) => {
    try {
        var url = req.file.originalname;

        const { name, week, description, time_taken_to_complete } = req.body;

        const request = req.body;

        console.log(request);

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 4) {
            run = false;
        }

        console.log(Object.keys(request).length);

        for (const element in request) {
            console.log(element);
            if (request[element].length == 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            const new_resource = new research_resources({
                name,
                week,
                description,
                time_taken_to_complete,
                url
            });

            const insert = await research_resources.create(new_resource);

            if (insert != null) {
                res.status(201).send("New Resource Adding Operation Sucessfully");
            } else {
                res.status(409).send("New Resource Adding Operation Failed");
            }
        } else if (!run) {
            res.status(409).send("Request is empty or a field is empty or missing");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
})

/**
 * @swagger
 * /portal/research-resources/get-info/week-1:
 *  get:
 *      summary: This api end-point is used to fetch all week 1 resources
 *      description: This api end-point is used to fetch all week 1 resources
 *      responses:
 *          200:
 *              description: Week 1 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/research-resources'
 *                              
 *          409:
 *              description: Week 1 Resource Not Found
 */
app.get('/portal/research-resources/get-info/week-1', async (req, res) => {
    const resource = await research_resources.find({ 'week': 1 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/research-resources/get-info/week-2:
 *  get:
 *      summary: This api end-point is used to fetch all week 2 resources
 *      description: This api end-point is used to fetch all week 2 resources
 *      responses:
 *          200:
 *              description: Week 2 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/research-resources'
 *                              
 *          409:
 *              description: Week 2 Resource Not Found
 */
app.get('/portal/research-resources/get-info/week-2', async (req, res) => {
    const resource = await research_resources.find({ 'week': 2 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/research-resources/get-info/week-3:
 *  get:
 *      summary: This api end-point is used to fetch all week 3 resources
 *      description: This api end-point is used to fetch all week 3 resources
 *      responses:
 *          200:
 *              description: Week 3 Resources Found
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/research-resources'
 *                              
 *          409:
 *              description: Week 3 Resource Not Found
 */
app.get('/portal/research-resources/get-info/week-3', async (req, res) => {
    const resource = await research_resources.find({ 'week': 3 });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(409).send("Resource Not Found");
    }
});

/**
 * @swagger
 * paths:
 *  /portal/research-resources/download/{file-name}:
 *      get:
 *          summary: This api end-point is used to fetch all 
 *          parameters:
 *            - in: path
 *              name: file-name
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: A PDF File
 *                  content:
 *                      application/pdf:
 *                          schema:
 *                              type: string
 *                              format: binary
 */
app.get('/portal/research-resources/download/:url', async (req, res) => {

    const file = research_resources.findOne({ url: req.params.url });

    console.log(req.params.url);
    var url = __dirname + '/resources/research/' + req.params.url
    //console.log(url);
    res.status(200).download(url);
});

/**
 * @swagger
 * paths:
 *  /portal/research-resources/delete/{file-name}:
 *      delete:
 *          summary: This api end-point is used to fetch all 
 *          parameters:
 *            - in: path
 *              name: file-name
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: PDF file deleted
 *                  content:
 *                  application/json:
 *                      schema: 
 *                          type: string
 */
app.delete('/portal/research-resources/delete/:url', async (req, res) => {
    const file = await research_resources.findOneAndDelete({ url: req.params.url });

    var filePath = './resources/research/' + req.params.url

    console.log(filePath);

    if (!filePath) {
        return res.status(400).json({ error: 'File path is missing in the request body.' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete the file.' });
        }

        return res.status(200).json({ message: 'File deleted successfully.' });
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});