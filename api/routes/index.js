'use strict'

var express = require('express')
var router = express.Router()
var ctrlDatabase = require('../controllers/database')

/* GET home page. */
router.get('/', (req, res, next) => {
  	express.static(__dirname + '/public/index.html')
})

router.get('/createdb', ctrlDatabase.createDb)

router.get('/conectdb', ctrlDatabase.conectDb)

router.route('/createdemo/:recordTotal').get((req, res, next) => {
	var _recordTotal = req.params.recordTotal==null?50:req.params.recordTotal;
	ctrlDatabase.createDemo(_recordTotal).then(retvalor => {
		res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
	})
})

router.route('/createdemo').get((req, res, next) => {
	var _recordTotal = 50
	ctrlDatabase.createDemo(_recordTotal).then(retvalor => {
		res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
	})
})

module.exports = router
