var mongoose = require('mongoose');
var securepassword = require('secure-password');
pwd = securepassword();
var userSchema = new mongoose.Schema({
    auth:{
        email: String,
        password: String,
        firstname: String,
        lastname: String,
        profile_photo:String,
        username: String
    }

});


userSchema.methods.generateHash = function (password) {
    const userpassword = Buffer.from(password);
    return pwd.hashSync(userpassword);
};

userSchema.methods.validPassword = function (password) {
    return pwd.verifySync(Buffer.from(password), this.auth.password);
};
module.exports = mongoose.model('User', userSchema);