import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

type Usuario   ={
    __v:string,
    _id:string,
    uid:String,
    nombre:String,
    estado:Boolean,
    correo: String,
    password: String,
    img: String,
    rol: String
    google: Boolean

}


export interface  tokenCafe extends  JwtPayload{
    uid: string,
    usuario?: Usuario|null,
}

export interface request extends Request{
    uid:string,
    usuario?: Usuario|null
}
