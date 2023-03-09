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

module.exports = {
	dummy, totalLikes, favouriteBlog
}