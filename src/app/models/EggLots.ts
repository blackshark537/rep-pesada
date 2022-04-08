export interface  EggLotInterface{
    id?:number  | string;
    date: string | Date; 
    year: number;
    day: number;
    dia: number;
    month: number;
    day_name: string;
    estado?: string;
    cant_gallinas_proyectadas: number;
    variable_mortalidad_recria: number;
    variable_mortalidad_produccion: number;
    variable_produccion_huevos_totales: number;
    production?: number;
    projections?:EggLotProjectionInterface[];
    days_passed?: number;
    weeks_passed?: number;
    cant_gallinas_existentes?: number;
    numero_huevos_incubables?: string,
    numero_nacimientos?: string,
    nacimientos_terminados?: number;
}

export interface  EggLotProjectionInterface{
    id?: string | number;
    dia: Date;
    estado: string;
    mortalidad: number;
    std_produccion: number;
    estandar_real: number;
    year: number;
    month: number;
    day: number;
    
    numero_de_aves: number;
    numero_de_aves_real: number;

    prod_huevos_totales: number;
    prod_huevos_totales_real: number;

    huevos_incubables: string;
    huevos_incubables_real: string;

    nacimientos_totales: string;
    nacimientos_totales_real: string;

    nacimientos_terminados: number;
    nacimientos_terminados_real: number;
}