const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();

app.get('/fake/users/', function (req, res) {
    const {num} = req.query;

    let index = 1;
    let users = [];
    while (index <= num) {
        users.push({
            email : faker.internet.email(),
            password : faker.internet.password(),
            contact : faker.phone.number(),
            fullName : faker.person.fullName()
        });
        index++;
    }
    res.status(200).json(users);
})
app.listen(3000)
