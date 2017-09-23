'use strict'

var express = require('express')
var api = express.Router()
var measureCtrl = require('../controllers/measure')


api.route('/faker')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		measureCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		measureCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/:measureId/active')
	.patch((req, res, next) => {
		measureCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err=>{
			res.status(500).json({message: err.message})
		})
	})

api.route('/:measureId')
	// .get(measureCtrl.getCategory)
	.get((req, res, next) => {
		measureCtrl.getOne(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})
	.put((req, res, next) => {
		measureCtrl.update(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})
	.delete((req, res, next) => {
		measureCtrl.remove(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})

api.route('/')
	.get((req, res, next) => {
		measureCtrl.getAll(req, res).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(500).json({message: err.message})
		})
	})
	.post((req, res, next) => {
		measureCtrl.save(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(500).json({message: err.message})
		})
	})

module.exports = api;
