import  {Request,Response} from 'express';
import Usuario from '../models/uasuario';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';
import { googleVerify } from '../helpers/google-verify';


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


export const googleSignIn = async (req:Request, res:Response)=>{

    const request:any = req.body

    const {id_token} = request;

    try {

        const {correo,nombre,img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            const data = {
                nombre :nombre,
                correo :correo,
                password:':b',
                img:img,
                google: true,
                rol:'ADMIN_ROLE'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            res.status(401).json({
                msg:'Hable con el administrador'
            });
            return 
        }

        const token = await generarJWT(usuario.id);

        res.json({
           usuario,
           token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar'
        });
        
    }



}
