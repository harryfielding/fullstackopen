const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is 0', () => {
		const blogs = []

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	})
	test('when list only has one blog equals the likes of that', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			}
		]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(100)
	})
	test('of a bigger list is calculated correctly', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			},
			{
				title: 'test blog 2',
				author: 'test person 2',
				url: 'https://example.com/blog2',
				likes: 2000000,
				id: '6408d809172af41d0bc50df3'
			}
		]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(2000100)
	})
})

describe('favourite blog', () => {
	test('of empty list is null', () => {
		const blogs = []

		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual(null)
	})

	test('of 1-length list is the only blog', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			}
		]

		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual(blogs[0])
	})

	test('of bigger list is calculated correctly', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			},
			{
				title: 'test blog 2',
				author: 'test person 2',
				url: 'https://example.com/blog2',
				likes: 2000000,
				id: '6408d809172af41d0bc50df3'
			}
		]

		const result = listHelper.favouriteBlog(blogs)
		expect(result).toEqual(blogs[1])
	})
})

describe('most blogs', () => {
	test('of empty list is null', () => {
		const blogs = []

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual(null)
	})
	test('of 1-length list is the only author', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			}
		]

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: 'test person',
			blogs: 1
		})
	})
	test('of bigger list is calculated correctly', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			},
			{
				title: 'test blog 2',
				author: 'test person 2',
				url: 'https://example.com/blog2',
				likes: 2000000,
				id: '6408d809172af41d0bc50df3'
			},
			{
				title: 'test blog 2 2: the sequel',
				author: 'test person 2',
				url: 'https://example.com/blog2sequel',
				likes: 2,
				id: '640b4afbfc92573d81716142'
			}
		]

		const result = listHelper.mostBlogs(blogs)
		expect(result).toEqual({
			author: 'test person 2',
			blogs: 2
		})
	})
})

describe('most likes', () => {
	test('of empty list is null', () => {
		const blogs = []

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual(null)
	})
	test('of 1-length list is the only author and has correct number of likes', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			}
		]

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: 'test person',
			likes: 100
		})
	})
	test('of bigger list is calculated correctly', () => {
		const blogs = [
			{
				title: 'test blog',
				author: 'test person',
				url: 'https://example.com/blog',
				likes: 100,
				id: '6401346e559b148826fba1a2'
			},
			{
				title: 'test blog 2',
				author: 'test person 2',
				url: 'https://example.com/blog2',
				likes: 2000000,
				id: '6408d809172af41d0bc50df3'
			},
			{
				title: 'test blog 2 2: the sequel',
				author: 'test person 2',
				url: 'https://example.com/blog2sequel',
				likes: 2,
				id: '640b4afbfc92573d81716142'
			}
		]

		const result = listHelper.mostLikes(blogs)
		expect(result).toEqual({
			author: 'test person 2',
			likes: 2000002
		})
	})
})