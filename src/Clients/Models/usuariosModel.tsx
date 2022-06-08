export interface Usuarios {
    id: string;
    usuario: string;
    password: string;
    nombres: string;
    apellidos: string;
    correo: string;
    fechaNacimiento: Date;
    telefono: string;
    idBusiness: string;
    isAdmin: boolean;
    created_at: Date;
    
}