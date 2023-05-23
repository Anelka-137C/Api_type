import  {Request,Response} from 'express';
import Usuario from '../models/uasuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';




export const login = async (req:Request,res:Response)=>{

    const {correo, password}:authRequest = req.body;
   console.log(correo);

    try {

        

        //verificar si el Email existe
        const usuario = await Usuario.findOne({correo});

        
        
        
        if(!usuario){
            res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
            return;
        }

        // Si el usuario esta activo 
        if(!usuario?.estado){
            res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            });
            return;
        }

        //Verificar la contraseña 
        const validPassword = bcryptjs.compareSync(password,<string>usuario?.password);
        if(!validPassword){
            res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
            return;
        }

        // Gnerar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        });
        return;
    }


   
}
