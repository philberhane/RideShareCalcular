module.exports = {
    
    registerStripe(req, res) {
        
        const stripe = require("stripe")(process.env.STRIPE_PRIVATE_API);
        const nodemailer = require('nodemailer');
        
        const token = req.body.token
        const chargeAmount = req.body.charge
        
        const paymentMethod = req.body.paymentMethod
        const chargeAmountWithDecimal = req.body.chargeAmountWithDecimal
        const annualFeeIncluded = req.body.annualFeeIncluded
        const generalInfo = req.body.generalInfo
        const parentOne = req.body.parentOne
        const parentTwo = req.body.parentTwo
        const childrenObjects = req.body.childrenObjects
        const emergencyContact1 = req.body.emergencyContact1
        const emergencyContact2 = req.body.emergencyContact2
        const additionalInfo = req.body.additionalInfo
        
        console.log(childrenObjects)
        
        
        stripe.charges.create({
            amount: chargeAmount,
            currency: 'usd',
            description: 'Rideshare Registration',
            source: token,
});
        let childString;
        
        for(i=0;i<childrenObjects.length;i++) {
            childString += '\n \n Child' + '\n Full Name: '+childrenObjects[i].name+'\n Gender: '+childrenObjects[i].gender+'\n Date Of Birth: '+childrenObjects[i].dateOfBirth+'\n Current School: '+childrenObjects[i].currentSchool+'\n Teacher Name: '+childrenObjects[i].teacherName+'\n Booster Seat? '+childrenObjects[i].booster
            
            if (childrenObjects[i].booster === 'Yes') {
               childString += '\n Height: '+ childrenObjects[i].height+'\n Weight: '+childrenObjects[i].weight
            }
        }
        
        console.log(childString)
        
        // Email functions goes here
        var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});
        
        var mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "A New User has registered!",
  text: 'An invoice of $'+chargeAmountWithDecimal+' has been paid using '+paymentMethod+'\n Does this include the $35 Registration Fee? '+annualFeeIncluded+'\n \n The following information was filled out: \n\n Home Address: '+generalInfo.homeAddress+'\n Home Phone Number: '+generalInfo.homePhone+'\n\n Parent #1 \n Full Name: '+parentOne.name+'\n Cell Phone Number: '+parentOne.cellNumber+ '\n Email Address: '+parentOne.email+'\n Work Address: '+parentOne.workAddress+'\n Work Phone Number: '+parentOne.workAddress+'\n\n Parent #2 \n Full Name: '+parentTwo.name+'\n Cell Phone Number: '+parentTwo.cellNumber+ '\n Email Address: '+parentTwo.email+'\n Work Address: '+parentTwo.workAddress+'\n Work Phone Number: '+parentTwo.workAddress+childString+'\n \n Emergency Contact #1'+'\n Full Name: '+emergencyContact1.name+'\n Relationship: '+emergencyContact1.relationship+'\n Phone Number: '+emergencyContact1.number+'\n \n Emergency Contact #2'+'\n Full Name: '+emergencyContact2.name+'\n Relationship: '+emergencyContact2.relationship+'\n Phone Number: '+emergencyContact2.number+'\n \n Additional Info:'+'\n \n'+additionalInfo
}; 
     transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
  }
         
         
});   
        
    },
    
    
    
    
    sendEmailPayPal(req, res) {
    const nodemailer = require('nodemailer');
        
    const paymentMethod = req.body.paymentMethod
        const chargeAmountWithDecimal = req.body.chargeAmountWithDecimal
        const annualFeeIncluded = req.body.annualFeeIncluded
        const generalInfo = req.body.generalInfo
        const parentOne = req.body.parentOne
        const parentTwo = req.body.parentTwo
        const childrenObjects = req.body.childrenObjects
        const emergencyContact1 = req.body.emergencyContact1
        const emergencyContact2 = req.body.emergencyContact2
        const additionalInfo = req.body.additionalInfo   
        
        
    let childString;
        
        for(i=0;i<childrenObjects.length;i++) {
            childString += '\n \n Child' + '\n Full Name: '+childrenObjects[i].name+'\n Gender: '+childrenObjects[i].gender+'\n Date Of Birth: '+childrenObjects[i].dateOfBirth+'\n Current School: '+childrenObjects[i].currentSchool+'\n Teacher Name: '+childrenObjects[i].teacherName+'\n Booster Seat? '+childrenObjects[i].booster
            
            if (childrenObjects[i].booster === 'Yes') {
               childString += '\n Height: '+ childrenObjects[i].height+'\n Weight: '+childrenObjects[i].weight
            }
        }
        
        console.log(childString)
        
        // Email functions goes here
        var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});
        
        var mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "A New User has registered!",
  text: 'An invoice of $'+chargeAmountWithDecimal+' has been paid using '+paymentMethod+'\n Does this include the $35 Registration Fee? '+annualFeeIncluded+'\n \n The following information was filled out: \n\n Home Address: '+generalInfo.homeAddress+'\n Home Phone Number: '+generalInfo.homePhone+'\n\n Parent #1 \n Full Name: '+parentOne.name+'\n Cell Phone Number: '+parentOne.cellNumber+ '\n Email Address: '+parentOne.email+'\n Work Address: '+parentOne.workAddress+'\n Work Phone Number: '+parentOne.workAddress+'\n\n Parent #2 \n Full Name: '+parentTwo.name+'\n Cell Phone Number: '+parentTwo.cellNumber+ '\n Email Address: '+parentTwo.email+'\n Work Address: '+parentTwo.workAddress+'\n Work Phone Number: '+parentTwo.workAddress+childString+'\n \n Emergency Contact #1'+'\n Full Name: '+emergencyContact1.name+'\n Relationship: '+emergencyContact1.relationship+'\n Phone Number: '+emergencyContact1.number+'\n \n Emergency Contact #2'+'\n Full Name: '+emergencyContact2.name+'\n Relationship: '+emergencyContact2.relationship+'\n Phone Number: '+emergencyContact2.number+'\n \n Additional Info:'+'\n \n'+additionalInfo
}; 
     transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
  }
         
         
});   
}
    
    
    
    
}