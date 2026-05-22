import bcrypt from "bcryptjs"

import User from "../models/user.model.js"

import Audit from "../models/audit.model.js"

const getUsersService = async () => {

    try {

        console.log('SERVICE -> getUsersService')
        const users = await User.find().select('-password')
        return users
    } catch (error) {
        throw error
    }
}

const createUserService = async (data) => {

    try {

        console.log('SERVICE -> createUserService')
        console.log(data)

        const existUser = await User.findOne({ email: data.email })
        if (existUser) {
            throw new Error('El email ya está registrado')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        
        const newUser = new User({
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    password: hashedPassword,
    edad: data.edad,
    sexo: data.sexo,
    telefono: data.telefono,
    direccion: data.direccion,
    localidad: data.localidad,
    provincia: data.provincia,
    pais: data.pais,
    cp: data.cp
})

await newUser.save() // ✅ Corregido

return {
    id: newUser._id, // ✅ Corregido (Mongoose usa _id)
    nombre: newUser.nombre,
    apellido: newUser.apellido,
    email: newUser.email,
    password: newUser.password,
    edad: newUser.edad,
    sexo: newUser.sexo,
    telefono: newUser.telefono,
    direccion: newUser.direccion,
    localidad: newUser.localidad,
    provincia: newUser.provincia,
    pais: newUser.pais,
    cp: newUser.cp
}
    
    } catch (error) {
        throw error
    }
}

const updateUserService = async (id, data) => {

    try {

        console.log('SERVICE -> updateUserService')
        console.log(id)
        console.log(data)

        const user = await User.findById(id)
        if (!user) {
            throw new Error('Usuario no encontrado')
        }
    
        // NO permitir cambiar email
        if (data.email) {
            throw new Error('El mail no puede modificarse')
        }
    
        // Update parcial

        if (data.nombre) user.nombre = data.nombre
        if (data.apellido) user.apellido = data.apellido
        if (data.edad) user.edad = data.edad
        if (data.sexo) user.sexo = data.sexo
        if (data.telefono) user.telefono = data.telefono
        if (data.direccion) user.direccion = data.direccion
        if (data.localidad) user.localidad = data.localidad
        if (data.provincia) user.provincia = data.provincia
        if (data.pais) user.pais = data.pais
        if (data.cp) user.cp = data.cp
        
        // Cambiar password si viene
        if (data.password) {
            user.password = await bcrypt.hash(
                data.password,
                10
            )
        }

    await user.save()

    return {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        edad: user.edad,
        sexo: user.sexo,
        telefono: user.telefono,
        direccion: user.direccion,
        localidad: user.localidad,
        provincia: user.provincia,
        pais: user.pais,
        cp: user.cp
    }
} catch (error) {
        throw error
    }
}

const deleteUserService = async (id) => {

    try {

        console.log('SERVICE -> deleteUserService')
        console.log(id)
        
        const user = await User.findById(id)
        if (!user) {
            throw new Error('Usuario no encontrado')
        }

        // AUDITORIA
        
        await Audit.create({
            usuarioEliminado: user
        })

        await User.findByIdAndDelete(id)

        return {
            message: `Usuario eliminado`
        }
    } catch (error) {
        throw error
    }
}


export {

    getUsersService,
    
    createUserService,
    
    updateUserService,
    
    deleteUserService
}