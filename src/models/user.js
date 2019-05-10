const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
	name: {
		type: String,
		trim: true,
		required: true

	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Not a valid email address')
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (validator.contains(value.toLowerCase(), 'password')) {
				throw new Error(`Password cannot contain the word "password"`)
			}
		}
	}

})

module.exports = User
