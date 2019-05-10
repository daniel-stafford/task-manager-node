require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findOneAndDelete({
// 	_id: '5cd41a8e4c6df484df07ad57'
// }).then((result) => {
// 	console.log(result)
// 	return Task.countDocuments({
// 		completed: false
// 	}).then((result) => {
// 		console.log(result)
// 	}).catch((err) => {
// 		console.log(err)
// 	});
// })

const deleteTaskAndCount = async (id, completed) => {
	await Task.findByIdAndDelete(id)
	const count = await Task.countDocuments({
		completed
	})
	return count
}

deleteTaskAndCount('5cd468fe5b8f798cdfa1a750', false).then((result) => {
	console.log(result)
}).catch((err) => {
	console.log(err)
});
