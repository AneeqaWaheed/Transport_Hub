const express = require('express');
const { DriverController } = require('../controllers/drivers/driverRegistrationController'); 
const driverLogin = require('../controllers/drivers/driverLoginController');  // Adjust this line
const router = express.Router();
require("../db/connection")

router.post("/registration", DriverController.driverRegistration);
router.post("/verify-otp", DriverController.verifyOTP)
router.patch("/updateDriver/:driverEmail", DriverController.updateDriver);
router.post('/driver_signIn', driverLogin);

module.exports = router;