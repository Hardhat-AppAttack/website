const express= require('express');
//const app = express();
const formData = require('../Model/formData');

const formSubmit = (req,res) => {
   
        let userData = new formData ({
            name: req.body.name,
            id: req.body.id,
            email: req.body.email,
            message: req.body.message
            
        })
        userData.save()
        .then(userData => {
            res.json({
                message: 'Enquiry sent successfully!'
            })
        })
        .catch(error => {res.json({
            message: "An error occured!"
    
        })
    })
}


module.exports = {formSubmit};

