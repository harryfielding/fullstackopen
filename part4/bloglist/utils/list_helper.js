// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.length ? blogs.reduce((sumLikes, currentBlog) => sumLikes + currentBlog.likes, 0) : 0
}

module.exports = {
	dummy, totalLikes
}