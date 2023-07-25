
var mongoose = require('mongoose');

/*
            Complete the TransactionSchema which will contain the name,
            reference number, and the amount of a transaction in the database.
*/

var TransactionSchema = new mongoose.Schema({
    // your code here

    name: {
        type: String,
        required: true
    },
    refno: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Transaction', TransactionSchema);
