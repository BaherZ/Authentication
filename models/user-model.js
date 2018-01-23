const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	google:{
		username: String,
	    googleId: String,
	    thumbnail: String
	},
	facebook:{
		username:String,
		facebookId:String,
		token:String,
		email:String
	}
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
