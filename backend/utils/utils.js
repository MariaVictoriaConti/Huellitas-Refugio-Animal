const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const dataPath = path.join(__dirname, '../data/data.json');


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

module.exports = { readData, writeData };