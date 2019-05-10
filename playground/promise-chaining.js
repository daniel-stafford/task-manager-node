require('./../src/db/mongoose')
const User = require('../src/models/user')

//5cd411f4d8603281798b45d0

// User.findByIdAndUpdate('5cd4150b0eadac822ff86a6c', {
// 	age: 1
// }).then((user) => {
// 	console.log(user)
// 	return User.countDocuments({
// 		age: 1
// 	}).then((count) => {
// 		console.log(count)
// 	}).catch((err) => {
// 		console.log(err);
// 	});
// })

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, {
		age
	})
	const count = await User.countDocuments({
		age
	})
	return count
}

updateAgeAndCount('5cd411f4d8603281798b45d0', 22).then((count) => {
	console.log('count is', count)
}).catch((err) => {
	console.log(err)
});
