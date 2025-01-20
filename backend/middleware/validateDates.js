const express = require('express');


//middlewares para validar datos ingresaados en el body en operaciones post
const validateAnimal = (req, res, next) => {
    const { nombre, edad, disponible } = req.body;
    if (!nombre || !edad || !disponible) {
        return    res.status(400).json({ error: 'Faltan datos obligatorios.' })
    }
    next();
    }

module.exports = validateAnimal;