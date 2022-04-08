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
    "cant_gallinas_asignadas": string;
    "empresa_type": string;
    "Inicio_de_operaciones"?: any
}

export interface positions{
    latitude: number;
    longitude: number;
    accuracy: number;
    empresa?: string;
    asignacion?: number | string;
    importadas?: number | string;
    recria?: number | string;
    poblacion?: number | string;
    h_totales?: number | string;
    h_incubables?: number | string;
    nacimientos?: number | string;
  }