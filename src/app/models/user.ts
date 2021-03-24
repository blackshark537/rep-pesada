import { BusinessInterface } from "./business";

export interface User {
    "id": number;
    "nombres": string;
    "apellidos": string;
    "cedula": string;
    "telefono": string;
    "sexo": string;
    "direccion": string;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "owner_email": string;
    "empresa": BusinessInterface
}
