export interface  EggLotInterface{
    date: string | Date; 
    year: number;
    day: number;
    dia: number;
    month: number;
    projection?:any[];
    day_name: string;
    cant_gallinas_proyectadas: number;
    cant_gallinas_reales: number;
    variable_mortalidad_recria: number;
    variable_mortalidad_produccion: number;
    variable_produccion_huevos_totales: number;
}