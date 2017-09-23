'use strict'

var express = require('express')
var api = express.Router()
var categoryCtrl = require('../controllers/category')


api.route('/faker')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		categoryCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/faker/:recordTotal')
	.get((req, res, next) => {
		let total = req.params.recordTotal==null?20:req.params.recordTotal;
		categoryCtrl.faker(total).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		})
	})

api.route('/:categoryId/active')
	.patch((req, res, next) => {
		categoryCtrl.active(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch(err=>{
			res.status(500).json({message: err.message})
		})
	})

api.route('/:categoryId')
	// .get(categoryCtrl.getCategory)
	.get((req, res, next) => {
		categoryCtrl.getOne(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})
	.put((req, res, next) => {
		categoryCtrl.update(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})
	.delete((req, res, next) => {
		categoryCtrl.remove(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err)=> {
			res.status(500).json({message: err.message})
		})
	})

api.route('/')
	.get((req, res, next) => {
		categoryCtrl.getAll(req, res).then((retvalor)=>{
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(500).json({message: err.message})
		})
	})
	.post((req, res, next) => {
		categoryCtrl.save(req, res).then((retvalor) => {
			res.status(retvalor.statusCode).json({message: retvalor.message, data: retvalor.data})
		}).catch((err) => {
			res.status(500).json({message: err.message})
		})
	})

module.exports = api;
