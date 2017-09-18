var mongoose = require('mongoose');
var securepassword = require('secure-password');
pwd = securepassword();
var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    auth:{
        email: String,
        password: Buffer,
        profile_photo:String,
        username: String
    }

});


userSchema.methods.generateHash = function (password) {
    const userpassword = Buffer.from(password);
    return pwd.hashSync(userpassword);
};

userSchema.methods.validPassword = function (password) {
    const userpassword = Buffer.from(password);
    return pwd.verifySync(userpassword, this.auth.password);
};
module.exports = mongoose.model('User', userSchema);