const express= require('express');
const app = express();
const recruitData = require('../Model/recruitForm');

const recruitFormSubmit = (req,res) => {
   
        let userData = new recruitData ({
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
            
        })
        userData.save()
        .then(userData => {
            res.json({
                message: 'Recruitment form submitted successfully. Thanks for your interest in our company. We will get in touch soon!'
            })
        })
        .catch(error => {res.json({
            message: "An error occured!"
    
        })
    })
}


module.exports = {recruitFormSubmit};

