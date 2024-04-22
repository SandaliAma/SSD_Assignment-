const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    itnumber:'String',
    walletId:'String',
    date: 'String',
    amount: 'String',
});

const WalletModel = mongoose.model('Wallet' ,WalletSchema)

module.exports = WalletModel;
