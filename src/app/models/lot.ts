import { BusinessInterface } from "./business";
import { CapacityInterface } from "./capacity";

export interface LotInterface {
    "id": number,
    "codigo_empresa": string,
    "codigo_aduanero": string,
    "fecha_entrada": string,
    "cantidad": CantidadInterface,
    "lote": string,
    "published_at": string,
    "created_at": string,
    "updated_at": string,
    "raza": string,
    "owner_email": string,
    "capacidad_instalada": CapacityInterface;
    "variable_mortalidad_recria": number;
    "variable_mortalidad_produccion": number;
    "variable_produccion_huevos_totales": number;
    "variable_aprovechamiento_huevos": number;
    "variable_nacimiento": number;
    "empresa": BusinessInterface;
    "cant_gallinas_asignadas"?: string;
}

interface CantidadInterface{
    id: number;
    hembras: string;
    machos: string;
}

export interface LotModel {
    id: number | string;
    business: string;
    phone: string;
    address: string;
    date: Date;
    code: string;
    mort: number;
    mortp: number;
    std_prod: number;
    std_aprov: number;
    race: string
    entry: Date
    week: number;
    days: number;
    endBreeding: Date
    females: number
    males: number
}

export interface LotResponse {
    id: number | string;
    business: string;
    phone: string;
    address: string;
    date: Date;
    code: string;
    mort: number;
    mortp: number;
    std_prod: number;
    std_aprov: number;
    race: string;
    entry: Date;
    week: number;
    days: number;
    endBreeding: Date;
    females: number;
    males: number;
    status: string;
    recria: LotRecria[];
    produccion: LotProduction[];
    total: number;
    recibidas: number;
    production: number;
    incubables: number;
    nacimientos: number;
}

export interface LotRecria{
    id: number | string;
    business: string;
    day: number;
    weekIndx: number;
    mort: number;
    mortp: number;
    std_prod: number;
    std_aprov: number;
    entry: Date;
    chicks: number;
}

export interface LotProduction{
    id: number | string;
    business: string;
    day: number;
    dayIndx: number;
    mort:  number;
    entry: Date;
    standar: number;
    aprov: number;
    chicks: number;
    stdreal: number;
    hincub: number;
    prodhtotal: number;
    birth: number;
    birthtotal: number;
}

