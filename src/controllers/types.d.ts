interface bodyRequest {
    _id:string,
    nombre:String,
    correo: String,
    password: string,
    img: String,
    rol: String
    google: Boolean
}

interface authRequest{
    correo: string,
    password: string
}