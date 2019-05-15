const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(500).send(error)
	}
})

router.get('/tasks', async (req, res) => {
	try {
		const task = await Task.find({})
		res.send(task)
	} catch (error) {
		res.status(500).send()
	}
})


router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id
	try {
		const result = await Task.findById(_id)
		if (!result) {
			return res.status(404).send()
		}
		res.send(result)
	} catch (err) {
		res.status(500).send()
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = [
		"description",
		"completed"
	]
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
	if (!isValidUpdate) {
		return res.status(400).send({
			Error: 'Invalid update'
		})
	}
	try {
		const task = await Task.findById(req.params.id)
		updates.forEach((update) => task[update] = req.body[update])
		await task.save()

		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true
		// })
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (error) {
		res.status(500).send(error)
	}
})

module.exports = router
