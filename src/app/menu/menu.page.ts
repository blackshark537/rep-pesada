import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  currentYear = new Date().getFullYear();
  exitButtonColor = 'warning';
  subtitle='Rep. Dom.';
  public appPages = [
    { title: 'Empresas Genéticas', url:'/menu/select/0', icon: '/assets/icon/smart-farm.png', color:"platinum" },
    { title: 'Progenitores Abuelos', url:'/menu/select/1', icon: '/assets/icon/chicken (3).png', color:"platinum"  },
    { title: 'Plantas Incubadoras Progenitores Abuelos', url:'/menu/select/2', icon: '/assets/icon/eggs.png', color:"platinum"  },
    { title: 'Proyectos Reprodutoras Pesadas', url:'/menu/select/3', icon: '/assets/icon/chicken (2).png', color:"platinum"  },
    { title: 'Planta De Incubacion Reprodutoras Pesadas', url:'/menu/select/4', icon: '/assets/icon/eggs.png', color:"platinum"  },
    { title: 'Industria Avicola Pollo De Engorde', url:'/menu/select/5', icon: '/assets/icon/chicken (1).png', color:"platinum"  },
    { title: 'Resumen Gráfico', url:'/menu/select/6', icon: '/assets/icon/bar-graph.png', color:"platinum"  },
    { title: 'Historico Precios De Huevos', url:'/price-history', icon: 'assets/icon/price-tag.png', color: "platinum"  },
    { title: 'Precios De Commodities', url: '/docview/Commodities', icon: 'assets/icon/silo.png', color:"platinum"  },
    { title: 'Costos De Producción', url: '/costos-produccion', icon: 'assets/icon/production.png', color:"platinum"  },
    { title: 'Geoposición De La Industria', url: '/menu/select/10', icon: 'assets/icon/placeholder.png', color:"platinum"  },
    { title: 'Programa Sanitario De La Industria', url: '/menu/select/11', icon: 'assets/icon/vaccine.png', color:"platinum"  },
    { title: 'RESUMEN EJECUTIVO DE LA PRODUCCIÓN NACIONAL', url: '/home/general', icon: 'assets/icon/cv.png', color:"platinum"  },
    { title: 'Administrador', url: '/admin', icon: 'assets/icon/filtrar.png', color:"platinum"  },
  ];

  public subPages = {
    'Empresas Genéticas':[
      //{ title: 'HISTORIA DE LA INDUSTRIA AVICOLA DE LA R.DOM.', url: '/history', icon: 'time-outline', color:"platinum" },
      { title: 'NOMBRES Y REGISTRO DE LAS EMPRESAS', url: '/business/abuelos', icon: 'business-outline', color:"platinum"  },
      { title: 'ASIGNACION VS IMPORTACION ABUELAS COBB-ROSS', url: '/data-driven', icon: 'share-social-outline', color:"platinum"  },
      { title: 'CALENDARIO DE ENTRADA LOTES', url: '/monthly-data', icon: 'calendar-number-outline', color:"platinum"  },
      { title: 'GRAFICA PARTICIPACION DEL MERCADO ', url: '/production/pie-light-breeder', icon: 'pie-chart-outline', color:"platinum"  },
      { title: 'ENTRADA COMPARATIVA MENSUAL', url: '/production/bar-month-lot-breeder', icon: 'bar-chart-outline', color:"platinum"  },
    ],
    'Progenitores Abuelos':[
      { title: 'EXISTENCIA DE AVES EN RECRIA POR EMPRESA', url: '/lot/breeding', icon: 'female', color:"platinum"  },
      { title: 'EXISTENCIA AVES EN PRODUCCION POR EMPRESA', url: '/lot/production', icon: 'female', color:"platinum"  },
      { title: `POBLACION DIARIA DE LAS AVES EN PRODUCCION ${this.currentYear}`, url: `/daily-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `NACIMIENTO DE POLLITAS REPRODUCTORAS DIARIA/MES ${this.currentYear}`, url: `/daily-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD.', url: '/production/light-breeder', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'PRODUCCION HUEVOS T.INCUBABLES Y POLLITAS REPROD. POR MES', url: '/production/bar-month-light-breeder', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'ESTADO DE LA PRODUCCIÓN', url: '/data-analyst', icon: 'analytics-outline', color:"platinum"  },
      { title: 'INVENTARIO GENERAL', url: '/daily-projection', icon: 'document-text-outline', color:"platinum"  },
      { title: 'RESUMEN EJECUTIVO DE LA PRODUCCIÓN NACIONAL', url: '/home/abuelos', icon: 'document-outline', color:"platinum"  },
    ],
    'Plantas Incubadoras Progenitores Abuelos':[
      { title: 'INCUBACIONES PROYECTADAS PROG. ABUELOS', url: '/births-by-weeks', icon: 'egg-outline', color:"platinum"  },
      //{ title: 'INCUBACIONES REALES PROG. ABUELOS', url: '/births-by-weeks/real', icon: 'egg-outline', color:"platinum"  },
    ],
    'Proyectos Reprodutoras Pesadas':[
      { title: 'NOMBRES Y REGISTRO DE LOS PRODUCTORES', url: '/business/pesada', icon: 'business-outline', color:"platinum"  },
      { title: 'REPRODUCTORAS EN RECRIA ', url: '/eggs-production/recria', icon: 'female', color:"platinum"  },
      { title: 'REPRODUCTORAS EN PRODUCCION', url: '/eggs-production/produccion', icon: 'female', color:"platinum"  },
      { title: `POBLACION DIARIA/Mes,\nAVES EN PRODUCCION ${this.currentYear}`, url: `/daily-prod-projection/true/aves/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS TOTALES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_producidos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE HUEVOS INCUBABLES DIARIO/MES ${this.currentYear}`, url: `/daily-prod-projection/true/huevos_incubables/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `NACIMIENTO DE POLLITAS DIARIA/MES/AÑO ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `PRODUCCION DE POLLOS TERMINADOS ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: 'ESCENARIO DE PRODUCION COMPARATIVO', url: '/daily-prod-projection', icon: 'document-text-outline', color:"platinum"  },
      { title: 'GRAFICA COMPARATIVA DE AVES EN RECRIA VS PROD.', url: '/production/chicks-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS DIARIOS', url: '/production/day-line-eggs-industry', icon: 'trending-up-outline', color:"platinum"  },
      { title: 'GRAFICA PRODUCCION/HUEVOS MENSUAL', url: '/production/month-bar-eggs-industry', icon: 'bar-chart-outline', color:"platinum"  },
      { title: 'RESUMEN EJECUTIVO DE LA PRODUCCIÓN NACIONAL', url: '/home/pesadas', icon: 'document-outline', color:"platinum"  },
    ],
    'Planta De Incubacion Reprodutoras Pesadas':[
      { title: 'NACIMIENTOS DE POLLITAS POR PROYECCION POLLOS DE ENGORDE', url: '/births-by-weeks/real', icon: 'egg-outline', color:"platinum"  },
      { title: 'NACIMIENTOS DE POLLITAS REAL POLLOS DE ENGORDE', url: '/births-by-weeks/real', icon: 'egg-outline', color:"platinum"  },
    ],
    'Industria Avicola Pollo De Engorde':[
      { title: `Inventario Pollos Terminados en Pie ${this.currentYear}`, url: `/daily-prod-projection/true/nacimientos_terminados/produccion/${this.currentYear}`, icon: 'document-text-outline', color:"platinum"  },
      { title: `Resumen De Produccion Mensual`, url: null, icon: 'document-text-outline', color:"platinum"  },
      { title: 'Producción Diaria Pollos Terminados', url: null, icon: 'trending-up-outline', color:"platinum"  },
      { title: 'Producción Mensual Pollos Terminados', url: null, icon: 'bar-chart-outline', color:"platinum"  },
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
      { title: 'Geoposición De las Empresas Progen. Abuelos', url: '/geoposition/abuelas', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Empresas Rep. Pesadas', url: '/geoposition/reproductoras', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Plantas Incubadoras', url: '/business/new', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Granjas Avicolas', url: '/business/new', icon: 'location-outline', color:"platinum"  },
      { title: 'Geoposición De las Plantas De Proceso', url: '/business/new', icon: 'location-outline', color:"platinum"  },
    ],
  };

  sub=false;
  subIndex='Empresas Genéticas';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    const index = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(index>=0){
      this.openSub(this.appPages[index]);
      this.sub=true;
    }else{
      this.sub=false;
    }
  }

  get isPesadas(): boolean{
    return this.subIndex.includes('Pesadas')? true : false;
  }

  openSub(p){
    this.subIndex = p.title;
    if(p.title === 'Empresas Genéticas'){ 
      this.subtitle = 'Progenitores Abuelos Cobb - Ross';
    } else if(p.title === 'Progenitores Abuelos'){
       this.subtitle = 'Progenitores Abuelos Cobb - Ross';
    } else if(p.title === 'Reprodutoras Pesadas'){ 
      this.subtitle = 'Reproductoras Pesadas';
    } else if(p.title === 'Proyectos Reprodutoras Pesadas'){
      this.subtitle = 'Proyectos Reprodutoras Pesadas'
    }

    if(p.url){
      this.router.navigate([p.url]);
    } else {
      this.sub=true;
    }
  }

  closeSub(){
    this.sub=false;
    this.subtitle='Rep. Dom.';
  }

  logScrolling(evt){
    if(evt.detail.currentY > 20){
      this.exitButtonColor='light';
    }else{
      this.exitButtonColor='warning';
    }
  }
}
