import jwt from 'jsonwebtoken';
import {tokenCafe} from '../helpers/types';

export  const generarJWT =(uid:string =''):Promise<string| Error | undefined>=>{
    return new Promise((resolve, reject) =>{
        const payload:tokenCafe = {uid};
        jwt.sign(payload,<string>process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{

            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    })
}


