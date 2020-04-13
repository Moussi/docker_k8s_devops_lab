const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: 'username is required', min: [4, 'Too short, min is 4 characters'], max: [32, 'Too long, max is 32 characters']},
    email: { type: String, 
        required: 'email is required', 
        min: [4, 'Too short, min is 4 characters'], 
        max: [32, 'Too long, max is 32 characters'],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]    
    },
    password: { type: String, required: 'password is required', min: [4, 'Too short, min is 4 characters'], max: [32, 'Too long, max is 32 characters']},
    rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }]
});

userSchema.methods.isSamePassword = function(requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    var user = this;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema)
