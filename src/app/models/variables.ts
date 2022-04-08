export interface iMortalidadRecriaDetails {
    id?: number;
    gumboro: number;
    newcastle: number;
    clostridium: number;
    influenza: number;
    anemia: number;
    viruela: number;
    defi_nutricional: number;
    clima: number;
    otros: number;
  }
  
export interface iMortalidadProdDetails {
    id?: number;
    baja_postura: number;
    newcastle: number;
    coriza: number;
    colera: number;
    influenza: number;
    pneumovirus: number;
    gallisepticum: number;
    synoviae: number;
    anemia: number;
    viruela: number;
    defi_nutricional: number;
    clima: number;
    otros: number;
  }
  
export   interface iProdHuevosDetails{
    id?: number;
    baja_postura: number;
    newcastle: number;
    coriza: number;
    colera: number;
    influenza: number;
    pneumovirus: number;
    gallisepticum: number;
    synoviae: number;
    anemia: number;
    viruela: number;
    defi_nutricional: number;
    clima: number;
    otros: number;
  }
  
export   interface iAprovHuevosDetails{
    id?: number;
    huevos_piso: number;
    cama: number;
    nidal: number;
    baja_postura: number;
    recoleccion: number;
    defi_nutricional: number;
    clima: number;
  }
  
export   interface iNacimientosDetails{
    id?: number;
    gallos: number;
    sobrepeso: number;
    huevos_sucios: number;
    contaminacion: number;
    encefalomielitis: number;
    clima: number;
    defi_nutricional: number;
  }

export interface iMortalidadPollitos{
  id?: number;
  newcastle: number;
  gumboro: number;
  hepatitis: number;
  influenza: number;
  anemia: number;
  coccidiosis: number;
  micoplasma: number;
  calefaccion: number;
  clima: number;
  defi_nutricional: number;
}

export interface iFormVariables{
  id?: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;

  mortalidad_recria: number;
  mortalidad_recria_details: iMortalidadRecriaDetails;

  mortalidad_produccion: number;
  mortalidad_produccion_details: iMortalidadProdDetails;

  produccion_huevos_totales: number;
  produccion_huevos_totales_details: iProdHuevosDetails;

  aprovechamiento_huevos: number;
  aprovechamiento_huevos_details: iAprovHuevosDetails;

  nacimientos: number;
  nacimientos_details: iNacimientosDetails;

  mortalidad_pollitos?: number;
  mortalidad_pollitos_details?: iMortalidadPollitos;

  edad_semanas: number;
}