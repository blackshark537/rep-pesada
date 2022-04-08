import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  Administrador = [
    { title: 'Registro De las Empresas Progen. Abuelos', url: '/forms/business/abuelos/new', icon: 'add-outline', color:"primary"  },
    { title: 'Registro De las Empresas Reproductoras', url: '/forms/business/pesada/new', icon: 'add-outline', color:"medium"  },
    { title: 'Registro De Lotes Progen. Abuelos', url: '/forms/lots/new/abuelos', icon: 'add-outline', color:"secondary"  },
    //{ title: 'Registro De Lotes Rep. Pesadas', url: '/lot-production', icon: 'add-outline', color:"medium"  },
    { title: 'Estadares De Progen. Abuelos', url: 'rep-abuelas/variables', icon: 'settings-outline', color:"secondary"  },
    { title: 'Estandares De Reproductoras', url: 'rep-pesadas/variables', icon: 'settings-outline', color:"medium"  },
    { title: 'Ajuste De Variables De Progen. Abuelos', url: 'general/variables/true', icon: 'settings-outline', color:"primary"  },
    { title: 'Ajuste De Variables De Reproductoras', url: 'general/variables/false', icon: 'settings-outline', color:"medium"  },
    { title: 'Elección Productiva Por Empresa', url: '', icon: 'business-outline', color:"primary"  },
    //{ title: 'Variables De Pollos De Engorde', url: '/variable/edit', icon: 'settings-outline', color:"medium"  },
  ]

  constructor() { }

  ngOnInit() {
  }

}
