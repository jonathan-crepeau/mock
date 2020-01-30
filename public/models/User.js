const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String, // can change to hash later
    favorites: [{
        type: Schema.Types.ObjectId,  //REFERENCING :D
        ref: 'Favorite'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
