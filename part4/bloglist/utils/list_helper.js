const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.length ? blogs.reduce((sumLikes, currentBlog) => sumLikes + currentBlog.likes, 0) : 0
}

const favouriteBlog = blogs => {
	return blogs.length ? blogs.reduce((favourite, currentBlog) => {
		if (!favourite.likes) {return currentBlog}
		if (currentBlog.likes > favourite.likes) {
			return currentBlog
		} else {
			return favourite
		}
	}, {}) : null
}

const mostBlogs = blogs => {
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

const mostLikes = blogs => {
	if (_.isEmpty(blogs)) {return null}

	const splitLikes = blogs.map(element => {
		return { author: element.author, likes: element.likes }
	})

	const likes = splitLikes.reduce((result, element) => {
		if (!result[element.author]) {return { ...result, [element.author]: element.likes }} else {
			return { ...result, [element.author]: result[element.author] + element.likes }
		}
	}, {})

	const mostLiked = _.reduce(likes, (result, value, key) => {
		return value > result.likes ? { author: key, likes: value } : result
	}, { likes: -1 })

	return mostLiked
}

module.exports = {
	dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}