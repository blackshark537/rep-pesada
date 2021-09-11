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
    "nave"?: number;
    "seeccion"?: string;
    "lote_type"?: LotType;
}

interface CantidadInterface{
    id?: number;
    hembras: string;
    machos: string;
}

export interface LotModel {
    id: number;
    lotId: number;
    variable_nacimiento: number;
    cant_gallinas_asignadas:string;
    business: string;
    phone: string;
    address: string;
    date: Date;
    code: number;
    variable_mortalidad_recria: number;
    variable_mortalidad_produccion: number;
    variable_produccion_huevos_totales: number;
    variable_aprovechamiento_huevos: number;
    race?: string
    entry: Date;
    week: number;
    days: number;
    endBreeding: Date;
    females: number;
    males: number;
    status?: string;
    total?: number;
    recibidas?: number;
    projections?: LotProjection[],
    production?: number;
    incubables?: number;
    nacimientos?: number;
}

export interface LotResponse {    
    "id": string | number;
    "codigo_empresa": number;
    "codigo_aduanero": number;
    "fecha_entrada": string | Date;
    "cantidad": CantidadInterface;
    "lote": number;
    "published_at": Date;
    "created_at": Date;
    "updated_at": Date;
    "raza": string;
    "variable_mortalidad_recria": number;
    "variable_mortalidad_produccion": number;
    "variable_produccion_huevos_totales": number;
    "variable_aprovechamiento_huevos": number;
    "variable_nacimiento": number;
    "empresa": BusinessInterface;
    "month": Number;
    "year": number;
    "cant_gallinas_asignadas": string;
    "nave"?: number;
    "seccion"?: string;
    "lote_type"?: LotType;
}

export enum LotType{
    ABUELOS = 'abuelos',
    PESADA = 'pesada',
}

export interface LotRecria{
    id: number | string;
    business: string;
    day: number;
    weekIndx: number;
    mort: number;
    std_prod: number;
    std_aprov: number;
    entry: Date;
    chicks: number;
    standar: number;
    aprov: number;
    stdreal: number;
    hincub: number;
    prodhtotal: number;
    birth: number;
    birthtotal: number;
}

export interface  LotProjection{
    "id": string | number;
    "dia": Date;
    "numero_de_aves": string;
    "age": number;
    "mortalidad": number;
    "mortalidad_estandar": number;
    "std_produccion": number;
    "prod_huevos_totales": string;
    "aprovechamiento_de_huevos_estandar": number;
    "huevos_incubables": string;
    "estandar_de_nacimientos": number;
    "nacimientos_totales": string;
    "estado": string;
    "year": number;
    "month": number;
    "empresa": string;
    "published_at"?: Date;
    "created_at"?: Date;
    "updated_at"?: Date;
    "lote": number;
    "day": number;
}

export interface LotForm{
    fecha_entrada: Date;
    variable_mortalidad_recria: number;
    variable_mortalidad_produccion: number;
    variable_produccion_huevos_totales: number;
    variable_aprovechamiento_huevos: number;
    variable_nacimiento: number;
    month: number;
    year: number;
    cant_gallinas_asignadas: number;
    empresa: number;
    cantidad: CantidadInterface;
}

