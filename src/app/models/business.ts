import { CapacityInterface } from "./capacity";

export interface BusinessInterface {
    "id": number;
    "telefono": string;
    "direccion": string;
    "correo": string;
    "RNC": string;
    "owner_email": string;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "nombre_comercial": string;
    "perfil_usuario": any;
    "capacidad_instaladas"?: CapacityInterface[];
}
