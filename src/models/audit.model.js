import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({

  usuarioEliminado: {
    type: String,
    required: true
  },

  fechaEliminacion: {
    type: Date,
    default: Date.now   
  }
})

const Audit = mongoose.model("Audit", auditSchema)

export default Audit