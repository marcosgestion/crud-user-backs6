import {

    getUsersService,

    createUserService,

    updateUserService,

    deleteUserService

} from '../services/user.service.js'

const getUsers = async (req, res) => {

    try {

        console.log('CONTROLLER -> getUsers')
        const users = await getUsersService()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {

    try {

        console.log('CONTROLLER -> createUser')
        const user = await createUserService(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {

    try {

        console.log('CONTROLLER -> updateUser')
        const user = await updateUserService(req.params.id, req.body)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {

    try {

        console.log('CONTROLLER -> deleteUser')
        const user = await deleteUserService(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser
} 
