import { BusinessInterface } from "./business";
import { CapacityInterface } from "./capacity";

export interface LotInterface {
    "id": number;
    "codigo_empresa": string;
    "codigo_aduanero": string;
    "fecha_entrada": string;
    "cantidad"?: CantidadInterface,
    "lote": string;
    "published_at": string;
    "created_at": string;
    "updated_at": string;
    "raza":  string;
    "owner_email": string;
    "capacidad_instalada"?: CapacityInterface;
    "variable_mortalidad_recria": number;
    "variable_mortalidad_produccion": number;
    "variable_produccion_huevos_totales": number;
    "variable_aprovechamiento_huevos": number;
    "variable_nacimiento": number;
    "empresa"?: BusinessInterface
    
}

interface CantidadInterface{
    "id": number;
    "hembras": string;
    "machos": string;
}
