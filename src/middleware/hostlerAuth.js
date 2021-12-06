const express = require('express');
const Hostler = require('../models/hostler');
const jwt = require('jsonwebtoken');

const hostlerAuth = async (req, res) => {
    try {
        const token = req.body['Authorization'].replace('Bearer ','');
        const _id = jwt.verify(token, 'iiitl-hostel-management-api');
        const user = await Hostler.findById({ _id});
        if(!user) {
            throw new Error();
        }
    } catch(e) {
        throw new Error("Please Authenticate");
    }

}