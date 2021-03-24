import { CapacityInterface } from "./capacity";

export interface LotInterface {
    "id": number;
    "codigo_empresa": string;
    "codigo_aduanero": string;
    "fecha_entrada": string;
    "cantidad": CantidadInterface,
    "lote": string;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "raza": string;
    "owner_email": string;
    "capacidad_instalada": CapacityInterface;
}

interface CantidadInterface{
    "id": number;
    "hembras": string;
    "machos": string;
}
