import { BusinessInterface } from "./business";

export interface CapacityInterface {
    "id": number;
    "direccion": string;
    "ambiente": string;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "empresa"?: BusinessInterface,
    "area"?: AreaInterface;
    "ubicacion"?: UbicacionInterface;
    "inventario": any[]
}

interface AreaInterface{
    "id": number;
    "largo": string;
    "ancho": string;
}

interface UbicacionInterface{
    "id": number;
    "lon": number;
    "lat": number;
}