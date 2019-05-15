const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true

	},
	email: {
		type: String,
		unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({
		email
	})
	if (!user) {
		throw new Error('Unable to login.')
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Unable to login.')
	}
	return user
}


//Has the plain text password
userSchema.pre('save', async function (next) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
