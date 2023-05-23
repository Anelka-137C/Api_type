"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.esAdminRole = void 0;
const esAdminRole = (req, res, next) => {
    if (!req.usuario) {
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
        return;
    }
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg: `${nombre} no es rol administrador`
        });
    }
    next();
};
exports.esAdminRole = esAdminRole;
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
            return;
        }
        if (!roles.includes(req.usuario.rol)) {
            res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
