import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppModel, LotType } from 'src/app/models';
import { ApiService } from 'src/app/services';

@Component({
  selector: 'app-business-pie-graph',
  templateUrl: './business-pie-graph.component.html',
  styleUrls: ['./business-pie-graph.component.scss'],
})
export class BusinessPieGraphComponent implements OnInit {

  showPie = false;
  asignacionTotal=0;
  single: any[]=[];
  view: any[] = [window.innerWidth-100, window.innerHeight-200];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendTitle="Empresas - % part"
  legendPosition: string = 'below';
  explodeSlices=false;

  colorScheme = {
    domain: ['#F25270','#B8D971','#F2955E','#F27141','#8C2C16','#D93644','#A62D59','#F22727','#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  status={
    asignacion:0,
    importacion:0,
    balance:0
  }
  year = new BehaviorSubject(new Date().getFullYear());

  constructor(
    private apiService: ApiService,
    private store: Store<AppModel>
  ) { }

  ngOnInit() {
    this.store.select('businesses').subscribe(empresas => {
      this.asignacionTotal = 0
      empresas.forEach(empresa => {
        this.asignacionTotal += parseInt(empresa?.cant_gallinas_asignadas)
        this.status.asignacion += parseInt(empresa?.cant_gallinas_asignadas)
      })
        this.year.pipe(
          switchMap(year => {
            return this.apiService.getLotsByYear(year).pipe(
              map(actions => actions.filter(l=> l.lote_type === LotType.ABUELOS)),
              map(lots => {

                let importacionTotal = 0
                let row = [];
                this.status.importacion = 0,
                this.status.balance = 0
                
                lots.forEach(lot => {
                  importacionTotal += parseInt(lot.cantidad.hembras)
                  this.status.importacion += parseInt(lot.cantidad.hembras)
                  this.status.balance = this.asignacionTotal - this.status.importacion
                });

                lots.forEach((lot, i) => {
                  let r = row.filter(r => r.empresa === lot.empresa.nombre_comercial)[0]
                  if (!!r) {
                    r.importadas += parseInt(lot.cantidad.hembras);
                    r.balance = this.asignacionTotal - parseInt(r.importadas)
                    r.cuota_importacion = ((parseInt(r.importadas) / importacionTotal) * 100).toFixed(2),
                      console.log('af', r)
                  } else {
                    row.push({
                      id: i + 1,
                      lotId: lot.id,
                      empresa: lot?.empresa?.nombre_comercial,
                      entrydate: new Date(lot.fecha_entrada).toLocaleDateString(),
                      asignacion: lot.empresa?.cant_gallinas_asignadas,
                      importadas: parseInt(lot.cantidad.hembras),
                      cuota_asignacion: ((parseInt(lot.empresa?.cant_gallinas_asignadas) / this.asignacionTotal) * 100).toFixed(2),
                      cuota_importacion: ((parseInt(lot.cantidad.hembras) / importacionTotal) * 100).toFixed(2),
                      balance: parseInt(lot.empresa?.cant_gallinas_asignadas) - parseInt(lot.cantidad.hembras)
                    });
                  }
                });
                return row;
              })
            );
          })).subscribe(rows => {
            console.log(rows);
            rows.forEach(r=>{
              this.single.push(
                {
                  "name":  (` ${r.empresa} - ${parseInt(r.cuota_asignacion)}%`).toLocaleUpperCase(),
                  "value": r.cuota_asignacion,
                  "extra": {
                    "code": "de"
                  }
                })
            })

            this.showPie=true;
          });
    });
  }

}
