const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app); //use http to put express on the server
const sequelize = require('./db');
const Contract = sequelize.import('./contract');


sequelize.sync()
//{force: true}

//body-parser allows access to the body
app.use(bodyParser.json()); // has to be above any requests that are coming in


app.get('/contract/:id', function(request, response) { //Get One
    var data = request.params.id;
    Contract.findOne({
        where: {id: data}
    }).then(
        function getSuccess(updateData) {
            response.json(updateData);
        },
        function getError(err) {
            response.send(500, err.message)
        }
    );
});

app.get('/approved-contracts', (request, response) => { //Get All
    Contract.findAll({
        where: {status: "Approved"}
    }).then(
        function findAllSuccess (data){
            response.json(data);
        },
        function findAllError (err){
            response.send(500, err.message);
        }
    )
})

app.post('/contract', (request, response) => { //Post One
    if(request.body.contracttype == "Express" && request.body.amountrequested < 50000 || request.body.contracttype == "Sales") {
        Status = "Approved";
        date = new Date();
    } else {
        Status = "Denied";
        date = null;
    }
    Contract.create({
        contracttype: request.body.contracttype,
        name: request.body.name,
        businessnumber: request.body.businessnumber,
        amountrequested: request.body.amountrequested,
        status: Status,
        activationdate: date
    }).then(
        (contractData) => response.json({contract: contractData}),
        (err) => response.json({error: err})
    )
})

app.put('/contract/:id', function(request, response) { //update one
    if(request.body.contracttype == "Express" && amountrequested < 50000 || request.body.contracttype == "Sales") {
        Status = "Approved";
        date = new Date();
    } else {
        Status = "Denied";
        date = null;
    }
    var contracttype = request.body.contracttype;
    var name = request.body.name;
    var businessnumber = request.body.businessnumber;
    var amountrequested = request.body.amountrequested;
    var status = Status;
    var activationdate = date;
    var data = request.params.id;
    Contract.update({
        contracttype: contracttype,
        name: name,
        businessnumber: businessnumber,
        amountrequested: amountrequested,
        status: status,
        activationdate: activationdate
    },
        {where: {id: data}
    }).then(
        function updateSuccess(updatedContract) {
            response.json(updatedContract);
        },
        function updateError(err) {
            response.send(500, err.message);
        })
});

app.delete('/contract/:id', function(request, response) {
    var data = request.params.id;
    Contract.destroy(
        {
            where: {id: data}
    }).then(
        function deleteContractSuccess(data) {
            response.send("you removed a contract");
        },
        function deleteContractError(err) {
            response.send(500, err.message);
        })
});

http.listen(3000, () => {
    console.log("listening on port 3000");
})
