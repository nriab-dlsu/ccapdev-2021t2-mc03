const db = require('../models/db.js');
const Transaction = require('../models/TransactionModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: function (req, res) {
        // your code here
        // get all the transactions from the database and render it 
        db.findMany(Transaction, {}, 'name refno amount', function (result) {
            var transaction = { 'transaction': result };
            console.log(transaction);

            if (result != null) {
                res.render('index', transaction); // This is to load the page initially
            } else {
                res.render('index');
            }
        })

    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: function (req, res) {
        // your code here
        var refno = req.query.refno;

        db.findOne(Transaction, { refno: refno }, 'refno', function (result) {
            res.send(result);
        })

    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
    getAdd: function (req, res) {
        // your code here
        var name = req.query.name;
        var refno = req.query.refno;
        var amount = req.query.amount;

        /* var doc = {
            name: name,     
            refno: refno,   
            amount: amount  
        }; */

        db.insertOne(Transaction, { name: name, refno: refno, amount: amount }, function (flag) {
            // insertOne function from mongoose returns a boolean value I think
            res.render('partials/card', { name: name, refno: refno, amount: amount }, function (err, html) {
                res.send(html);
            })
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        var refno = req.query.refno;

        db.deleteOne(Transaction, { refno: refno }, function (flag) {
            res.send(flag);
        });

    }

}

module.exports = controller;
