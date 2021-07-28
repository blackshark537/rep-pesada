import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  currentYear = new Date().getFullYear();
  subtitle='Sub-Sector Pollo'
  public appPages = [
    { title: 'Empresas Genéticas', url:null, icon: 'business-outline', color:"platinum" },
    { title: 'Progenitores Abuelos', url:null, icon: 'cube-outline', color:"platinum"  },
    { title: 'Plantas Incubadoras Progenitores Abuelos', url:null, icon: 'egg-outline', color:"platinum"  },
    { title: 'Proyectos Reprodutoras Pesadas', url:null, icon: 'cube-outline', color:"platinum"  },
    { title: 'Industria Avicola Pollo De Engorde', url:null, icon: 'cube-outline', color:"platinum"  },
    { title: 'Resumen Gráfico', url:null, icon: 'bar-chart-outline', color:"platinum"  },
    { title: 'Historico Precios De Huevos', url:'/price-history', icon: 'pricetag-outline', color: "platinum"  },
    { title: 'Precios De Commodities', url: '/docview/Commodities', icon: 'cash-outline', color:"platinum"  },
    { title: 'Costos De Producción', url: '/docview/eggsPrices', icon: 'pricetags-outline', color:"platinum"  },
    { title: 'Geoposición De La Industria', url: null, icon: 'location-outline', color:"platinum"  },
    { title: 'Programa Sanitario De La Industria', url: null, icon: 'medkit-outline', color:"platinum"  },
    { title: 'Administrador', url: '/admin', icon: 'settings-outline', color:"platinum"  },
  ];

  public subPages = {
    'Empresas Genéticas':[
      { title: 'HISTORIA DE LA INDUSTRIA AVICOLA DE LA R.DOM.', url: '/history', icon: 'time-outline', color:"platinum" },
      { title: 'NOMBRES Y REGISTRO DE LAS EMPRESAS', url: '/business', icon: 'business-outline', color:"platinum"  },
      { title: 'ASIGNACION VS IMPORTACION ABUELAS COBB-ROSS', url: '/data-driven', icon: 'share-social-outline', color:"platinum"  },
      { title: 'CALENDARIO DE ENTRADA LOTES', url: '/monthly-data', icon: 'calendar-number-outline', color:"platinum"  },
      { title: 'GRAFICA PARTICIPACION DEL MERCADO ', url: '/production/pie-light-breeder', icon: 'pie-chart-outline', color:"platinum"  },
      { title: 'ENTRADA COMPARATIVA MENSUAL', url: '/production/bar-month-lot-breeder', icon: 'bar-chart-outline', color:"platinum"  },
    ],
    'Progenitores Abuelos':[
      { title: 'EXISTENCIA DE AVES EN RECRIA POR EMPRESA', url: '/lot/breeding', icon: 'logo-twitter', color:"platinum"  },
      { title: 'EXISTENCIA AVES EN PRODUCCION POR EMPRESA', url: '/lot/production', icon: 'logo-twitter', color:"platinum"  },
      { title: `POBLACION DIARIA DE LAS AVES EN PRODUCCION ${this.currentYear}`, url: `/daily-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `NACIMIENTO DE POLLITAS REPRODUCTORAS DIARIA/MES ${this.currentYear}`, url: `/daily-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD.', url: '/production/light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD. POR MES', url: '/production/bar-month-light-breeder', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'DATA ANALYST', url: '/data-analyst', icon: 'analytics-outline', color:"platinum"  },
      { title: 'INVENTARIO GENERAL', url: '/daily-projection', icon: 'document-text-outline', color:"platinum"  },
      { title: 'RESUMEN CIERRE PRODUCTIVO', url: '/home/true', icon: 'document-outline', color:"platinum"  },
    ],
    'Plantas Incubadoras Progenitores Abuelos':[
      { title: 'NACIMIENTOS DE POLLITAS POR  PROYECCION ABUELOS', url: '/births-by-weeks', icon: 'egg-outline', color:"platinum"  },
    ],
    'Proyectos Reprodutoras Pesadas':[
      { title: 'ENTRADA REPRODUCTORAS Y AVES EN RECRIA ', url: '/eggs-production/recria', icon: 'logo-twitter', color:"platinum"  },
      { title: 'POBLACION DE AVES EN PRODUCCION Y PARAMETROS', url: '/eggs-production/produccion', icon: 'logo-twitter', color:"platinum"  },
      { title: `POBLACION DIARIA/MES DE LAS AVES EN PRODUCCION ${this.currentYear}`, url: `/daily-prod-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `NACIMIENTO DE POLLITOS DIARIA/MES/AÑO ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `COMPARATIVO DE HUEVOS T.INCUBABLES Y POLLITOS ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: 'ESCENARIO DE PRODUCION COMPARATIVO', url: '/daily-prod-projection', icon: 'document-text-outline', color:"platinum"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS DIARIOS', url: '/production/day-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS MENSUAL', url: '/production/month-bar-eggs-industry', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'RESUMEN CIERRE PRODUCTIVO', url: '/home/false', icon: 'document-outline', color:"platinum"  },
    ],
    'Industria Avicola Pollo De Engorde':[
      { title: `Inventario Pollos Terminados en Pie ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `Resumen De Produccion Mensual`, url: `/menu`, icon: 'document-text-outline', color:"platinum"  },
      { title: 'Producción Diaria Pollos Terminados', url: '/menu', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'Producción Mensual Pollos Terminados', url: '/menu', icon: 'bar-chart-outline', color:"platinum"  },
      //{ title: `Proyección Lb. Disponibles Al Mercado`, url: `/daily-meet-projection/${this.currentYear}`, icon: 'document-text-outline', color:"danger"  },
    ],
    'Resumen Gráfico':[
      { title: 'Part. Mercado/Empresa', url: '/production/pie-light-breeder', icon: 'pie-chart-outline', color:"platinum"  },
      { title: 'Entrada Abuelas Mensual', url: '/production/bar-month-lot-breeder', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'Inv. Aves Abuelas Recria/Producción', url: '/production/chicks-light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'P. H. Inc/Pollitas Diario', url: '/production/light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'P. H. Inc/Pollitas Mensual', url: '/production/bar-month-light-breeder', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'Data Analyst', url: '/data-analyst', icon: 'analytics-outline', color:"platinum"  },
      { title: 'Inv. Rep. Pesadas Recria/Producción', url: '/production/chicks-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'Producción/Huevos Diarios', url: '/production/day-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'Producción/Huevos Mensual', url: '/production/month-bar-eggs-industry', icon: 'bar-chart-outline', color:"platinum"  },
    ],
    'Geoposición De La Industria':[
      { title: 'Geoposición De las Empresas Progen. Abuelos', url: '/business/new', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Empresas Rep. Pesadas', url: '/business/new', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Plantas Incubadoras', url: '/business/new', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Granjas Avicolas', url: '/business/new', icon: 'location-outline', color:"platinum"  },
    ],
  };

  sub=false;
  subIndex='Empresas Genéticas';

  constructor(
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
  }

  openSub(p){
    this.subIndex = p.title;
    if(p.title === 'Empresas Genéticas'){ 
      this.subtitle = 'Progenitores Abuelos Cobb Ross';
    } else if(p.title === 'Progenitores Abuelos'){
       this.subtitle = 'Progenitores Abuelos Cobb Ross';
    } else if(p.title === 'Reprodutoras Pesadas'){ 
      this.subtitle = 'Reproductoras Pesadas';
    }

    if(p.url){
      this.router.navigate([p.url]);
    } else {
      this.sub=true;
    }
  }

  closeSub(){
    this.sub=false;
    this.subtitle='Sub-Sector Pollo';
  }
}
