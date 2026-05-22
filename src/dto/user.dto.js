import Joi from 'joi';

const createUserSchema = Joi.object({
  nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    edad: Joi.number(),
    sexo: Joi.string(),
    telefono: Joi.string(),
    direccion: Joi.string(),
    localidad: Joi.string(),
    provincia: Joi.string(),
    pais: Joi.string(),
    cp: Joi.number()
});

const updateUserSchema = Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    edad: Joi.number(),
    sexo: Joi.string(),
    telefono: Joi.string(),
    direccion: Joi.string(),
    localidad: Joi.string(),
    provincia: Joi.string(),
    pais: Joi.string(),
    cp: Joi.number()
})
export {
    createUserSchema,
    updateUserSchema
}