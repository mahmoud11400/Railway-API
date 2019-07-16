const express = require('express');
const route = express.Router();

const trackTrainController = require('../controller/trackTrain');

route.post('/train',trackTrainController.postTrackTrain);
module.exports=route;