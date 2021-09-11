
export interface ProductionInterface{
    "id"?: number;
    "fecha": Date;
    "inicio_dia": string;
    "mortalidad": number;
    "descarte": number;
    "venta": number;
    "final_dia": number;
    "grs_alimento": number;
    "total_alimento": number;
    "huevos_incubables": string;
    "huevos_dobles": string;
    "huevos_sucios": string;
    "huevos_comerciables": string;
    "huevos_rotos": string;
    "huevos_totales": string;
    "peso": number;
    "produccion": number;
    "aprovechamiento": number;
    "published_at"?: Date;
    "created_at"?: Date;
    "updated_at"?: Date;
    "lote"?: any;
    "semana": number;
    "nave": number;
    "seccion": string;
}

export interface DailyProdMetaInterface{
    "id"?: number;
    "fecha": string | Date;
    "published_at"?: string;
    "created_at"?: string;
    "updated_at"?: string;
    "lote": number;
    "daily_productions": ProductionInterface[]
}