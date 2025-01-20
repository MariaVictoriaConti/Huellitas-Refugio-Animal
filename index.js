const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Como hacemos para unir el front con el back??
const corsOptions = {
    origin: 'http://127.0.0.1:5500/public/index.html/',  // Asegúrate de que este sea el puerto donde corre tu frontend
    methods: 'GET,POST,PUT,DELETE'
};
const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
const dataPath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
//app.use(express.json());

//funciones para leer // estas serian funciones de utils
const readData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log("Error al leer el archivo de datos.", error);
    }
};

//y escribir datos en el json(Base de datos) // funciones de utils
const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

//middlewares para validar datos ingresaados en el body en operaciones post
const validateAnimal = (req, res, next) => {
    const { nombre, edad, disponible } = req.body;
    if (!nombre || !edad || !disponible) {
        return    res.status(400).json({ error: 'Faltan datos obligatorios.' })
    }
    next();
    }



//ROUTES
app.get('/', (req, res) => {
    res.send('Huellitas - Refugio Animal');
});

app.get('/animals', (req, res) => {
    const data = readData();
    res.status(200).json(data);
});

app.get('/animals/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const animal = data.find(animal => animal.id == id); // Convertir el id a un número
    if (!animal) {
        return res.status(404).json({ message: "Animal no encontrado" });
    }
    res.status(200).json(animal);
});

app.post('/animals', validateAnimal, (req, res) => {
    const data = readData();
    const { name, age, adopted } = req.body;
    const newAnimal = {
        id: data.length + 1, name: name, age: age, adopted: adopted
    }
const animal = data.find(animal => animal.name === name);
    if (animal) {
        res.status(400).json({ message: "Animal ya existe" });
        return;
    }

    data.push(newAnimal);
    writeData(data);
    res.status(201).json({ message: "Animal creado", newAnimal });
});

//En las pruebas me pasa que algunos ID los encuentra y otros no.. lo mismo en el post. Suele pasarme que el postman funciona como el tuje, a veces anda a veces no.
app.put('/animals/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const animal = data.find(animal => animal.id === parseInt(id));
    if (!animal) {
        res.status(404).json({ message: "Animal no encontrado" });
        return;
    }
    const updatedAnimal = { ...animal, ...req.body };
    const index = data.indexOf(animal);
    data[index] = updatedAnimal;
    writeData(data);
    res.status(200).json({ message: "Animal actualizado" });
});

app.delete('/animals/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const animal = data.find(animal => animal.id === parseInt(id));
    if (!animal) {
        return res.status(404).json({ message: "Animal no encontrado" });
    }
    const index = data.indexOf(animal);
    data.splice(index, 1);
    writeData(data);
    res.status(200).json({ message: "Animal eliminado" });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});