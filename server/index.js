const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : 'root',
    host: 'localhost',
    password: 'password',
    database: 'REACT_TEST'
});

app.post('/postProduct', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;

    let xiQuery = 'INSERT INTO PRODUCT (PRO_NAME, PRO_DESCRIPTION, PRO_PRICE, PRO_QUANTITY) VALUES(?, ?, ?, ?);'

    db.query(xiQuery, [name, description, price, quantity],
        (err, result) =>{
            if(err) console.log(err);
            else res.send("Produto inserido com sucesso!");
    });
});

app.get('/getProductsList', (req, res) =>{
    let xiQuery = 'SELECT * FROM PRODUCT';
    db.query(xiQuery, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.put("/putProduct", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    
    let xiQuery = "UPDATE PRODUCT SET PRO_NAME = ?, PRO_DESCRIPTION = ?, PRO_PRICE = ?, PRO_QUANTITY = ? WHERE PRO_ID = ?;";
    
    db.query(xiQuery, [name, description, price, quantity, id],
        (err, result) => {
            if(err) console.log(err);
            else res.send(result);
        });
});

app.delete('/deleteProduct/:id', (req, res) =>{
    const id = req.params.id;

    let xiQuery = "DELETE FROM PRODUCT WHERE PRO_ID = ?";

    db.query(xiQuery, id, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("CAPIVARA ESTÁ NO BACK!!!");
})