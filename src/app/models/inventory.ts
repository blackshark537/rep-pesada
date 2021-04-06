import { CapacityInterface } from "./capacity";

export interface Inventory {
    "id": number;
    "equipo":  string;
    "tipo":  string;
    "descripcion": string;
    "fecha_compra":  string;
    "vida_util": number;
    "capacidad_instalada"?: CapacityInterface;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "cantidad": number;
}
