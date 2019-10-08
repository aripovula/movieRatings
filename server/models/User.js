const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: Date.now
    },
    ratings: {
        type: [Schema.Types.ObjectId],
        ref:'Rating'
    },
    favorites: {
        type: String,
        required: false,
    },

});

// UserSchema.pre('save', function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             if (err) return next(err);
//             this.password = hash;
//             next();
//         })
//     })
// })

module.exports = mongoose.model('User', UserSchema);