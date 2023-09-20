const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const authenticateToken = require('./middleware/auth')

const { pt_src_resources, pt_src_tools_resources } = require('./models/pt-resources');
const research_resources = require('./models/research-resources');
const { web_dev_resources, web_dev_tools } = require('./models/web-dev-resources');


mongoose.connect("mongodb://127.0.0.1:27017/app-attack");

// Event handlers for connection, reconnection, and error
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('reconnected', () => {
    console.log('Reconnected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

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
                url: 'http://localhost:6060/'
            }
        ]
    },
    apis: ['./portal.js']
}

const app = express();
const port = 6060;

const swaggerSpec = swaggerJSDOC(options);

//app.use(authenticateToken); // To enable authentication on all the routes 
app.use('/portal/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Disable the "X-Powered-By" header
app.disable('x-powered-by');

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
 *                  week:
 *                      type: number
 *                  description:
 *                      type: string
 *                  team: 
 *                      type: string
 *                      enum: [PT, SRC]
 *                  time_taken_to_complete:
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: date
 *          pen-test-tools-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  created:
 *                      type: Date
 *                  week:
 *                      type: number
 *                  team:
 *                      type: string
 *                      enum: [PT, SRC]
 *                  os:
 *                      type: string
 *                      enum: [windows, linux, mac-os]
 *                  description:
 *                      type: string
 *                  url: 
 *                      type: string
 *          research-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  week:
 *                      type: number
 *                  description:
 *                      type: string
 *                  time_taken_to_complete:
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: date
 *          web-dev-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  week:
 *                      type: number
 *                  tutorial_type:
 *                      type: string
 *                      enum: [language, tool, web development concepts]
 *                  description: 
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: date
 *          web-dev-tools-resources:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  week: 
 *                      type: number 
 *                  tutorial_type:
 *                      type: string
 *                  description:
 *                      type: string
 *                  url:
 *                      type: string
 *                  created:
 *                      type: string
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

/**
 * @swagger
 * /portal/api-test:
 *  get:
 *      summary: This endpint is used to test if the API is working
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: To test GET method
 */
app.get('/portal/api-test', (req, res) => {
    res.send('The API is working!');
});

/**
 * @swagger
 * paths:
 *  /portal/pt-src-resources/{week}/{team}:
 *      get:
 *          summary: GET request using week and team
 *          description: This API endpoint can fetch PT and SRC resources based on week and team
 *          parameters:
 *            - in: path
 *              name: week
 *              required: true
 *              type: integer
 *              description: Week number
 *            - in: path
 *              name: team
 *              required: true
 *              type: string
 *              description: Team name 
 *              enum: [PT, SRC]
 *          responses:
 *              200:
 *                  description: Resource Found
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#components/schemas/pen-test-resources'
 *              404:
 *                  description: Resource Not Found
 *              409:
 *                  description: Conflict - Operation Failed
 */
app.get('/portal/pt-src-resources/:week/:team', async (req, res) => {

    if (parseInt(req.params.week)) {
        //
    } else {
        res.status(409).send("Enter integral value");
    }

    const resource = await pt_src_resources.find({ 'week': req.params.week, team: req.params.team });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(404).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/pt-src-resources:
 *  post:
 *      summary: POST request to add new PT and SRC resource 
 *      description: This API end-point is used to add new PT and SRC resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week:
 *                              type: number
 *                          team:
 *                              type: string
 *                          description:
 *                              type: string
 *                          time_taken_to_complete:
 *                              type: string
 *                          url:
 *                              type: string
 *      responses:
 *          201:
 *              description: Created - New PT and SRC resource has been created successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
 */
app.post('/portal/pt-src-resources', async (req, res) => {
    try {
        console.log(req.body);
        const { name, week, team, description, time_taken_to_complete, url } = req.body;

        //const created = Date.now();

        const request = req.body;

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 6) {
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
            const new_resource = new pt_src_resources({
                name,
                week,
                team,
                description,
                time_taken_to_complete,
                url
            });

            const insert = await pt_src_resources.create(new_resource);

            if (insert != null) {
                res.status(201).send("New Resource Adding Operation Sucessfully");
            } else {
                res.status(409).send("New Resource Adding Operation Failed");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
        }

    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
});

/**
 * @swagger
 * /portal/pt-src-resources:
 *  delete:
 *      summary: DELETE request to delete PT or SRC resource
 *      description: This end-point is used to delete existing PT and SRC resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          week:
 *                              type: number
 *                          team: 
 *                              type: string
 *      responses:
 *          204:
 *              description: Deleted - Existing PT and SRC resources deleted successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
 */
app.delete('/portal/pt-src-resources', async (req, res) => {
    try {
        const { name, week, team } = req.body;

        const request = req.body;
        console.log(request);

        var run = true;

        if (Object.keys(request).length === 0 || Object.keys(request).length < 3) {
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
                week,
                team
            }

            const del = await pt_src_resources.findOneAndDelete(query);

            if (del != null) {
                res.status(204).send("Resource is deleted");
            } else {
                res.status(409).send("Resources is not deleted");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
        }

    } catch (error) {
        console.log(`Error ${error}`);
        res.status(409).send(`Error: ${error}`);
    }
});

/**
 * @swagger
 * paths:
 *  /portal/pt-src-tools-resources/{week}/{team}:
 *      get:
 *          summary: GET request using week and team 
 *          description: This API endpoint can fetch PT and SRC tools resources based on week and team
 *          parameters:
 *            - in: path
 *              name: week
 *              required: true
 *              type: integer
 *              description: Week number
 *            - in: path
 *              name: team
 *              required: true
 *              type: string
 *              description: team name 
 *              enum: [PT, SRC]
 *          responses:
 *              200:
 *                  description: Resource Found
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#components/schemas/pen-test-tools-resources'
 *              404:
 *                  description: Resource Not Found
 *              409:
 *                  description: Conflict
 */
app.get('/portal/pt-src-tools-resources/:week/:team', async (req, res) => {

    if (parseInt(req.params.week)) {
        //
    } else {
        res.status(409).send("Enter integral value");
    }

    const resource = await pt_src_tools_resources.find({ 'week': req.params.week, team: req.params.team });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(404).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/pt-src-tools-resources:
 *  post:
 *      summary: POST request to add new PT and SRC tools resource
 *      description: This API end-point is used to add new PT and SRC tools resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week:
 *                              type: number
 *                          team:
 *                              type: string
 *                              enum: [PT, SRC]
 *                          os: 
 *                              type: string
 *                              enum: [windows, linux, mac-os]
 *                          description:
 *                              type: string
 *                          url:
 *                              type: string
 *      responses:
 *          201:
 *              description: Created - New PT and SRC resource has been created 
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
 */
app.post('/portal/pt-src-tools-resources', async (req, res) => {
    try {
        console.log(req.body);
        const { name, week, team, os, description, url } = req.body;

        //const created = Date.now();

        const request = req.body;

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 6) {
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
            const new_resource = new pt_src_tools_resources({
                name,
                week,
                team,
                os,
                description,
                url
            });

            const insert = await pt_src_tools_resources.create(new_resource);

            if (insert != null) {
                res.status(201).send("New Resource Adding Operation Sucessfully");
            } else {
                res.status(409).send("New Resource Adding Operation Failed");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
        }

    }
    catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
});

/**
 * @swagger
 * /portal/pt-src-tools-resources:
 *  delete:
 *      summary: DELETE request to delete existing PT and SRC tools resources 
 *      description: This end-point is used to delete existing PT and SRC tools resources 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          week:
 *                              type: number
 *                          team: 
 *                              type: string
 *      responses:
 *          204:
 *              description: Deleted - Existing PT and SRC resources deleted successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
 */
app.delete('/portal/pt-src-tools-resources', async (req, res) => {
    try {
        const { name, week, team } = req.body;

        const request = req.body;
        console.log(request);

        var run = true;

        if (Object.keys(request).length === 0 || Object.keys(request).length < 3) {
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
                week,
                team
            }

            const del = await pt_src_tools_resources.findOneAndDelete(query);

            if (del != null) {
                res.status(204).send("Resource is deleted");
            } else {
                res.status(409).send("Resources is not deleted");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
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
 *      summary: POST request to upload research resources
 *      description: This end-point is used to upload new Research resources 
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
 *          201:
 *              description: Created - New Research resources uploaded successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
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
            res.status(400).send("Request is empty or a field is empty or missing");
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
})

/**
 * @swagger
 * paths:
 *  /portal/research-resources/get-info/{week}:
 *      get:
 *          summary: GET request to get all the downloadable resources 
 *          description: This api end-point is used to fetch all downloadable resource for a particular week
 *          parameters:
 *            - in: path
 *              name: week
 *              required: true
 *              type: integer
 *              description: Week number
 *          responses:
 *              200:
 *                  description: Resource Found
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#components/schemas/research-resources'
 *              404:
 *                  description: Resource Not Found
 *              409:
 *                  description: Conflict - Operation Failed
 */
app.get('/portal/research-resources/get-info/:week', async (req, res) => {

    if (parseInt(req.params.week)) {
        //
    } else {
        res.status(409).send("Enter integral value");
    }

    const resource = await research_resources.find({ 'week': req.params.week });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(404).send("Resource Not Found");
    }
});

/**
 * @swagger
 * paths:
 *  /portal/research-resources/download/{file-name}:
 *      get:
 *          summary: GET request to download a particular research resource
 *          description: This end-point is used to download existing Research resources 
 *          parameters:
 *            - in: path
 *              name: file-name
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: PDF file download successfully
 *                  content:
 *                      application/pdf:
 *                          schema:
 *                              type: string
 *                              format: binary
 *              409:
 *                  description: Conflict - Operation Failed
 */
app.get('/portal/research-resources/download/:url', async (req, res) => {

    try {
        const file = research_resources.findOne({ url: req.params.url });

        console.log(req.params.url);
        var url = __dirname + '/resources/research/' + req.params.url
        //console.log(url);
        res.status(200).download(url);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }

});

/**
 * @swagger
 * paths:
 *  /portal/research-resources/delete/{file-name}:
 *      delete:
 *          summary: DELETE request to delete PDF research resource
 *          description: This end-point is used to delete existing Research PDF resources 
 *          parameters:
 *            - in: path
 *              name: file-name
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: PDF file deleted successfully
 *                  content:
 *                  application/json:
 *                      schema: 
 *                          type: string
 *              400: 
 *                  description: Bad Request - File Path Missing 
 *              500:
 *                  description: Internal Server Error - Failed to delete file
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

/**
 * @swagger
 * paths:
 *  /portal/web-dev-resources/{week}:
 *      get:
 *          summary: GET request to fetch Web Dev Resources
 *          description: This AIP end-point is used to get existing web dev resources of a particular week.
 *          parameters:
 *            - in: path
 *              name: week
 *              required: true
 *              type: integer
 *              description: Week number    
 *          responses:
 *              200:
 *                  description: Resource Found
 *                  content:
 *                      application/json:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/web-dev-resources'
 *              404:
 *                  description: Resource Not Found
 *              409:
 *                  description: Conflict
 *                          
 */
app.get('/portal/web-dev-resources/:week', async (req, res) => {

    if (parseInt(req.params.week)) {
        //
    } else {
        res.status(409).send("Enter integral value");
    }

    const resource = await web_dev_resources.find({ 'week': parseInt(req.params.week) });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(404).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/web-dev-resources:
 *  post:
 *      summary: POST request to add new Web Dev Resource 
 *      description: This API end-point is used to add new Web Development Resoureces
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week: 
 *                              type: number
 *                          tutorial_type:
 *                              type: string
 *                          description:
 *                              type: string
 *                          time_taken_to_complete:
 *                              type: string
 *                          url:
 *                              type: string
 *      responses: 
 *          201: 
 *              description: Created - New Web Dev resource created successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty            
 *          409:
 *              description: Conflict - Operation Failed
 */
app.post('/portal/web-dev-resources', async (req, res) => {
    try {
        const { name, week, tutorial_type, description, time_taken_to_complete, url } = req.body;

        const request = req.body;

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 6) {
            run = false;
        }

        for (const element in request) {
            if (request.hasOwnProperty(element) && request[element].length == 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            const new_resource = new web_dev_resources({
                name,
                week,
                tutorial_type,
                description,
                time_taken_to_complete,
                url
            })

            const insert = await web_dev_resources.create(new_resource);

            if (insert != null) {
                res.status(201).send("New Resource Adding Operation Sucessfully");
            } else {
                res.status(409).send("New Resource Adding Operation Failed");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
        }


    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(409).send(`Failed: ${error}`)
    }
});

/**
 * @swagger
 * /portal/web-dev-resources:
 *  delete:
 *      summary: DELETE request to delete Web Dev Resource
 *      description: This end-point is used to delete existing Web Development Resource
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week: 
 *                              type: number
 *      responses: 
 *          204: 
 *              description: Deleted - Existing Web Development resource deleted sucessfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation Failed
 */
app.delete('/portal/web-dev-resources', async (req, res) => {
    try {
        const { name, week } = req.body;

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
                week
            }

            const del = await web_dev_resources.findOneAndDelete(query);

            if (del != null) {
                res.status(204).send("Resource is deleted");
            } else {
                res.status(409).send("Resources is not deleted");
            }
        } else if (!run) {
            res.status(400).send("Request is empty or a field is empty or missing");
        }

    } catch (error) {
        console.log(`Error ${error}`);
        res.status(409).send(`Error`);
    }
});

/**
 * @swagger
 * paths:
 *  /portal/web-dev-tools-resources/{week}:
 *      get:
 *          summary: GET requets to get web dev resources
 *          description: This API end-point can be used to get Web Development Resources of a particular week
 *          parameters:
 *            - in: path
 *              name: week
 *              required: true
 *              type: integer
 *              description: Week number
 *          responses:
 *              200:
 *                  description: Resource Found
 *                  content: 
 *                      application/json:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/web-dev-tools-resources'
 *              404:
 *                  description: Resource Not Found
 *              409:
 *                  description: Conflict - Operation Failed
 *                        
 */
app.get('/portal/web-dev-tools-resources/:week', async (req, res) => {

    if (parseInt(req.params.week)) {
        //
    } else {
        res.status(409).send("Enter integral value");
    }

    const resource = await web_dev_tools.find({ 'week': parseInt(req.params.week) });
    if (resource != null) {
        console.log(resource);
        res.status(200).send(resource);
    } else {
        res.status(404).send("Resource Not Found");
    }
});

/**
 * @swagger
 * /portal/web-dev-tools-resources:
 *  post:
 *      summary: POST request to add new Web Dev Tools Resources
 *      description: This API end-point is used to add new Web Development Tools Resources
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week: 
 *                              type: number
 *                          description:
 *                              type: string
 *                          url:
 *                              type: string
 *      responses: 
 *          201: 
 *              description: Created - New Web Development Tools Resources created sucessfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty
 *          409:
 *              description: Conflict - Operation failed
 */
app.post('/portal/web-dev-tools-resources', async (req, res) => {
    try {
        const { name, week, description, url } = req.body;

        const request = req.body;

        var run = true;

        if (Object.keys(request).length == 0 || Object.keys(request).length < 4) {
            run = false;
        }

        for (const element in request) {
            if (request.hasOwnProperty(element) && request[element].length == 0) {
                console.log(`Field ${element} is empty`);
                run = false;
                break;
            }
        }

        if (run) {
            const new_resource = new web_dev_tools({
                name,
                week,
                description,
                url
            })

            const insert = await web_dev_tools.create(new_resource);

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
});

/**
 * @swagger
 * /portal/web-dev-tools-resources:
 *  delete:
 *      summary: DELETE request to delete Web Dev Tools resource
 *      description: This end-point is used to delete existing Web Dev Tools resources 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                          week: 
 *                              type: number
 *      responses: 
 *          204: 
 *              description: Deleted - Existing Web Development Tools Resource deleted successfully
 *          400:
 *              description: Bad Request - Operation failed or request has a empty field or the entire request is empty 
 *          409:
 *              description: Conflict - Operation Failed
 */
app.delete('/portal/web-dev-tools-resources', async (req, res) => {
    try {
        const { name, week } = req.body;

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
                week
            }

            const del = await web_dev_tools.findOneAndDelete(query);

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
        res.status(409).send(`Error`);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});