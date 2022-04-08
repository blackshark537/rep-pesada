import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, marker, icon, Layer, Map, MapOptions, LayerOptions } from 'leaflet';
import { positions } from 'src/app/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input('positions') positions: positions[] = [];

  data: positions;
  view = false;
  private layers:Layer[] = [];
  public layersControl = {
    baseLayers: {
      'Google Sheet': tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
        detectRetina: true
      }),
      'googleHybrid': tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
        detectRetina: true,
      }),
      /* 'googleSat': tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      }),*/
      /* 'googleTerrain': tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
      })  */
    },
  }  
  private options: MapOptions;
  _map: boolean = false;
  private center = latLng(19.4509255,-70.6948507);

  constructor() { }

  ngOnInit() {
    this._map = false;
    if(this.positions[0])this.center = latLng(this.positions[0].latitude, this.positions[0].longitude);

    this.options = {
      layers: [
        tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
        detectRetina: true
      }),
      ],
      zoom: 11,
      center: this.center,
    };
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.setUserLayer();
      this._map = true;
    }, 500);
  }

  onMapReady(map: Map) {
  }

  private setUserLayer(): void{
    this.positions.forEach(pos =>{
      this.layers.push(marker([pos.latitude, pos.longitude], {
        autoPan: true,
        icon: icon({
          iconSize: [ 22, 22 ],
          iconAnchor: [ 10, 10],
          iconUrl: 'assets/marker.png',
          //shadowUrl: 'assets/marker.png'
       })
      }).bindPopup(`
        <h4><b>${pos.empresa}</b></h4>
        <h5>Cantidad Asignada: ${this.commas(pos.asignacion)}</h5>
        <h5>Cantidad Importada: ${this.commas(pos.importadas)}</h5>
        <h5>Aves en Recría: ${this.commas(pos?.recria)}</h5>
        <h5>Aves en Producción: ${this.commas(pos?.poblacion)}</h5>
        <h5>Huevos Totales: ${this.commas(pos?.h_totales)}</h5>
        <h5>Huevos Icubables: ${this.commas(pos?.h_incubables)}</h5>
        <h5>Pollitos Nacidos: ${this.commas(pos?.nacimientos)}</h5>
      `).openPopup().addEventListener('click', ev=>{
        this.view = false;
        this.data = Object.assign({}, pos);
        setTimeout(()=>this.view = true, 5);
      }), 
      circle([pos.latitude, pos.longitude], { radius: pos.accuracy*10})
      .setStyle({
        fillColor: '#f2181805',
        color: '#f21818'
      })//.bindPopup("<h5>You are within " + pos.accuracy + " meters from the red point</h5>").openPopup()
      );
    })
  }

  commas(value: string | number): string {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  onMapClick($event){
    console.log('click', $event);
  }
}
