const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length ? blogs.reduce((sumLikes, currentBlog) => sumLikes + currentBlog.likes, 0) : 0
}

const favouriteBlog = (blogs) => {
	return blogs.length ? blogs.reduce((favourite, currentBlog) => {
		if (!favourite.likes) {return currentBlog}
		if (currentBlog.likes > favourite.likes) {
			return currentBlog
		} else {
			return favourite
		}
	}, {}) : null
}

const mostBlogs = (blogs) => {
	if (_.isEmpty(blogs)) {return null}

	const authors = blogs.map(element => {
		return element.author
	})

	const counted = _.countBy(authors)

	const authorObject = _.reduce(counted, (result, value, key) => {
		return value > result.blogs ? { author: key, blogs: value } : result
	}, { blogs: -1 })

	return authorObject
}

module.exports = {
	dummy, totalLikes, favouriteBlog, mostBlogs
}