const ContactService = require('../services/contactService');
const express = require('express');
const ApiResponse = require('../models/apiResponse');

var contactService = new ContactService();

module.exports = class ContactController{
    static getAll = async function (req, res){
        let apiResponse = await contactService.getAll();
        return res.status(apiResponse.status).json(apiResponse);
    }

    static get = async function (req, res){
        let apiResponse = await contactService.get((req.body.id !== undefined) ? req.body.id : req.query.id);
        console.log(apiResponse);
        return 
    }

    static getId = async function (req, res){
        let apiResponse = await contactService.get(req.params.id);
        console.log(apiResponse);
        return res.status(apiResponse.status).json(apiResponse);
    }

    static post = async function (req, res){
        let apiResponse = await contactService.insert(req.body);
        console.log(apiResponse);
        return res.status(apiResponse.status).json(apiResponse);
    }

    static put = async function (req, res){
        let apiResponse = await contactService.update(req.params.id, req.body);
        console.log(apiResponse);
        return res.status(apiResponse.status).json(apiResponse);
    }

    static delete = async function (req, res){
        let apiResponse = await contactService.delete(req.params.id);
        console.log(apiResponse);
        return res.status(apiResponse.status).json(apiResponse);
    }

}

