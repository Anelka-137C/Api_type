import { Schema ,model} from "mongoose";


interface Usuario {
    nombre:String,
    correo: String,
    password: String,
    img: String,
    rol: String
    google: Boolean

}

const UsuarioSchema:Schema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },

    img:{
        type:String
    },

    rol:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    google:{
        type: Boolean,
        default: false
    }
});



export default model<Usuario>('Usuarios',UsuarioSchema);