import axios from 'axios'

const url = "/api/persons"

const get = () => axios.get(url)

const create = newObject => axios.post(url, newObject)

const edit = (id, newObject) => axios.put(`${url}/${id}`, newObject)

const del = id => axios.delete(`${url}/${id}`)

const exports = {
    get: get,
    create: create,
    edit: edit,
    del: del
}

export default exports