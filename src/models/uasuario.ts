import { Schema ,model} from "mongoose";


type Usuario   ={
    __v:string,
    _id:string,
    uid:String,
    nombre:String,
    estado:boolean,
    correo: String,
    password: String,
    img: String,
    rol: string
    google: Boolean

}

type usuarioOut = {
   
    uid: String;
    nombre: String;
    estado: Boolean;
    correo: String;
    img: String;
    rol: String;
    google: Boolean;
    
}

const UsuarioSchema:Schema = new Schema({
    uid:{
        type:String,
        required:[false]
    },
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default: true
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

UsuarioSchema.methods.toJSON= function():usuarioOut{
    const {__v,password,_id,...usuario}:Usuario = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model<Usuario >('Usuarios',UsuarioSchema);
