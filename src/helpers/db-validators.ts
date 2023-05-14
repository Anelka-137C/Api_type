import Role from '../models/role';
import Usuario from '../models/uasuario';

export const esRoleValido = async (rol='') =>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
  }

  export const emailExiste = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} no esta registrado en la base de datos`);
    }
}

export const existeUsuarioPorId = async (id = '')=>{
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario){
      throw new Error(`El id no exise ${id}`);
  }
}