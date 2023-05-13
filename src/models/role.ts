import { Schema ,model} from "mongoose";

interface Role {
    rol: string
}
const RoleSchema = new Schema({
    rol:{
        type: String,
        required:[true, 'El rol es obligatorio']
    }
});

export default model<Role>('Role',RoleSchema);

