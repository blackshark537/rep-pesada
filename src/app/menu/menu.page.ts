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
    { title: 'Empresas Genéticas', url:null, icon: 'business-outline', color:"warning" },
    { title: 'Progenitores Abuelos', url:null, icon: 'cube-outline', color:"success"  },
    { title: 'Plantas Incubadoras Progenitores Abuelos', url:null, icon: 'egg', color:"secondary"  },
    { title: 'Proyectos Reprodutoras Pesadas', url:null, icon: 'cube-outline', color:"primary"  },
    { title: 'Industria Avicola Pollo De Engorde', url:null, icon: 'cube-outline', color:"tertiary"  },
    { title: 'Resumen Gráfico', url:null, icon: 'bar-chart-outline', color:"tertiary"  },
    { title: 'Historico Precios De Huevos', url:'/price-history', icon: 'pricetag-outline', color: "danger"  },
    { title: 'Precios De Commodities', url: '/docview/Commodities', icon: 'cash-outline', color:"light"  },
    { title: 'Costos De Producción', url: '/docview/eggsPrices', icon: 'pricetags-outline', color:"medium"  },
    { title: 'Geoposición De La Industria', url: null, icon: 'location-outline', color:"success"  },
    { title: 'Programa Sanitario De La Industria', url: null, icon: 'medkit-outline', color:"secondary"  },
    { title: 'Administrador', url: '/admin', icon: 'settings-outline', color:"light"  },
  ];

  public subPages = {
    'Empresas Genéticas':[
      { title: 'HISTORIA DE LA INDUSTRIA AVICOLA DE LA R.DOM.', url: '/history', icon: 'time-outline', color:"warning" },
      { title: 'NOMBRES Y REGISTRO DE LAS EMPRESAS', url: '/business', icon: 'business-outline', color:"success"  },
      { title: 'ASIGNACION VS IMPORTACION ABUELAS COBB-ROSS', url: '/data-driven', icon: 'share-social-outline', color:"secondary"  },
      { title: 'CALENDARIO DE ENTRADA LOTES', url: '/monthly-data', icon: 'calendar-number-outline', color:"tertiary"  },
      { title: 'GRAFICA PARTICIPACION DEL MERCADO ', url: '/production/pie-light-breeder', icon: 'pie-chart-outline', color:"medium"  },
      { title: 'ENTRADA COMPARATIVA MENSUAL', url: '/production/bar-month-lot-breeder', icon: 'bar-chart-outline', color:"danger"  },
    ],
    'Progenitores Abuelos':[
      { title: 'EXISTENCIA DE AVES EN RECRIA POR EMPRESA', url: '/lot/breeding', icon: 'logo-twitter', color:"primary"  },
      { title: 'EXISTENCIA AVES EN PRODUCCION POR EMPRESA', url: '/lot/production', icon: 'logo-twitter', color:"danger"  },
      { title: `POBLACION DIARIA DE LAS AVES EN PRODUCCION ${this.currentYear}`, url: `/daily-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"primary"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"secondary"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"tertiary"  },
      { title: `NACIMIENTO DE POLLITAS REPRODUCTORAS DIARIA/MES ${this.currentYear}`, url: `/daily-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"warning"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-light-breeder', icon: 'trending-up-outline', color:"light"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD.', url: '/production/light-breeder', icon: 'trending-up-outline', color:"tertiary"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD. POR MES', url: '/production/bar-month-light-breeder', icon: 'bar-chart-outline', color:"success"  },
      { title: 'DATA ANALYST', url: '/data-analyst', icon: 'analytics-outline', color:"success"  },
      { title: 'INVENTARIO GENERAL', url: '/daily-projection', icon: 'document-text-outline', color:"medium"  },
      { title: 'RESUMEN CIERRE PRODUCTIVO', url: '/home/true', icon: 'document-outline', color:"medium"  },
    ],
    'Plantas Incubadoras Progenitores Abuelos':[
      { title: 'NACIMIENTOS DE POLLITAS POR  PROYECCION ABUELOS', url: '/births-by-weeks', icon: 'egg', color:"danger"  },
    ],
    'Proyectos Reprodutoras Pesadas':[
      { title: 'ENTRADA REPRODUCTORAS Y AVES EN RECRIA ', url: '/eggs-production/recria', icon: 'logo-twitter', color:"warning"  },
      { title: 'POBLACION DE AVES EN PRODUCCION Y PARAMETROS', url: '/eggs-production/produccion', icon: 'logo-twitter', color:"primary"  },
      { title: `POBLACION DIARIA/MES DE LAS AVES EN PRODUCCION ${this.currentYear}`, url: `/daily-prod-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"primary"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"secondary"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"tertiary"  },
      { title: `NACIMIENTO DE POLLITOS DIARIA/MES/AÑO ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"warning"  },
      { title: `COMPARATIVO DE HUEVOS T.INCUBABLES Y POLLITOS ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"success"  },
      { title: 'ESCENARIO DE PRODUCION COMPARATIVO', url: '/daily-prod-projection', icon: 'document-text-outline', color:"light"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-line-eggs-industry', icon: 'trending-up-outline', color:"warning"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS DIARIOS', url: '/production/day-line-eggs-industry', icon: 'trending-up-outline', color:"danger"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS MENSUAL', url: '/production/month-bar-eggs-industry', icon: 'bar-chart-outline', color:"medium"  },
      { title: 'RESUMEN CIERRE PRODUCTIVO', url: '/home/false', icon: 'document-outline', color:"medium"  },
    ],
    'Industria Avicola Pollo De Engorde':[
      { title: `Inventario Pollos Terminados en Pie ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"success"  },
      { title: `Resumen De Produccion Mensual`, url: `/menu`, icon: 'document-text-outline', color:"warning"  },
      { title: 'Producción Diaria Pollos Terminados', url: '/menu', icon: 'trending-up-outline', color:"tertiary"  },
      { title: 'Producción Mensual Pollos Terminados', url: '/menu', icon: 'bar-chart-outline', color:"primary"  },
      //{ title: `Proyección Lb. Disponibles Al Mercado`, url: `/daily-meet-projection/${this.currentYear}`, icon: 'document-text-outline', color:"danger"  },
    ],
    'Resumen Gráfico':[
      { title: 'Part. Mercado/Empresa', url: '/production/pie-light-breeder', icon: 'pie-chart-outline', color:"secondary"  },
      { title: 'Entrada Abuelas Mensual', url: '/production/bar-month-lot-breeder', icon: 'bar-chart-outline', color:"primary"  },
      { title: 'Inv. Aves Abuelas Recria/Producción', url: '/production/chicks-light-breeder', icon: 'trending-up-outline', color:"light"  },
      { title: 'P. H. Inc/Pollitas Diario', url: '/production/light-breeder', icon: 'trending-up-outline', color:"tertiary"  },
      { title: 'P. H. Inc/Pollitas Mensual', url: '/production/bar-month-light-breeder', icon: 'bar-chart-outline', color:"success"  },
      { title: 'Data Analyst', url: '/data-analyst', icon: 'analytics-outline', color:"success"  },
      { title: 'Inv. Rep. Pesadas Recria/Producción', url: '/production/chicks-line-eggs-industry', icon: 'trending-up-outline', color:"warning"  },
      { title: 'Producción/Huevos Diarios', url: '/production/day-line-eggs-industry', icon: 'trending-up-outline', color:"danger"  },
      { title: 'Producción/Huevos Mensual', url: '/production/month-bar-eggs-industry', icon: 'bar-chart-outline', color:"medium"  },
    ],
    'Geoposición De La Industria':[
      { title: 'Geoposición De las Empresas Progen. Abuelos', url: '/business/new', icon: 'location-outline', color:"primary"  },
      { title: 'Geoposición De las Empresas Rep. Pesadas', url: '/business/new', icon: 'location-outline', color:"medium"  },
      { title: 'Geoposición De las Plantas Incubadoras', url: '/business/new', icon: 'location-outline', color:"warning"  },
      { title: 'Geoposición De las Granjas Avicolas', url: '/business/new', icon: 'location-outline', color:"success"  },
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
