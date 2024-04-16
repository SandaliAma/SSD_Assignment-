const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    itnumber:'String',
    studentname:'String',
    walletid: 'String',
    balance: 'String',
});

const WalletModel = mongoose.model('wallets' ,WalletSchema)

module.exports = WalletModel;
