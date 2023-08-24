var express = require("express")
var app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const contactForm = require("./models/formData")
const recruitForm = require("./models/recruitForm")
const url = "mongodb+srv://kaviuln1335:kaviuln@cluster0.hcagxgu.mongodb.net/?retryWrites=true&w=majority"


app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var port = process.env.port || 8080;

try{
    mongoose.connect(url, {useUnifiedTopology: true}, {useNewUrlParser: true},
        () => console.log("Mongoose connected"),
        );
    } catch (e) {
        console.log("Mongoose not connected!");
    }
    
    const db = mongoose.connection
    
    db.on('error', (err) => {
        console.log(err)
    })
    
    db.once('open', () => {
        console.log("Database Connection Established!")
    })

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/homepage.html');
})

app.get('/services', (req, res) => {
    res.sendFile(__dirname+'/portal.html');
})

app.get('/testimonials', (req, res) => {
    res.sendFile(__dirname+'/testimonial.html');
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname+'/aboutUs.html');
})

app.get('/contact', (req, res) => {
    res.sendFile(__dirname+'/contactUs.html');
})

app.get('/careers', (req, res) => {
    res.sendFile(__dirname+'/careers.html');
})

app.get('/recruitment', (req, res) => {
    res.sendFile(__dirname+'/recruitment.html');
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname+'/register.html');
})

// app.post('/contact', (req, res) => {
//     res.send("Thank you for getting in touch!");
// })

app.post('/contact', (req, res) => {
    let contact = new contactForm  ({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        message: req.body.message
    });

    contact.save();
    res.send("Thanks for contacting us!");
    //res.redirect('/path')
   // res.json(req.body);
})

app.post('/recruit', (req, res) => {
    let recruit = new recruitForm  ({
        given_name: req.body.given_name,
        std_id: req.body.std_id,
        family_name: req.body.family_name,
        enrolled_unit: req.body.enrolled_unit,
        target_grade: req.body.target_grade,
        reason_to_join: req.body.reason_to_join,
        team: req.body.team,
        prev_exp: req.body.prev_exp,
        leadership_interest: req.body.leadership_interest,
        available_days: req.body.available_days,
        available_timing: req.body.available_timing
    });

    recruit.save();
    res.send("Thanks for filling up the form. We will be in touch with you asap!");
    //res.redirect('/path')
   // res.json(req.body);
})

app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
    let users = new user ({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        contact: req.body.contact,
        password: hashedPass
        
    });
    users.save();
    res.send("User registered successfully!");
    //res.redirect('/path')
   // res.json(req.body);
})

 })

app.listen(port,()=>{
    console.log("App listening to: " + port)
})