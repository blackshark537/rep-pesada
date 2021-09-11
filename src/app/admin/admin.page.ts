import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  Administrador = [
    { title: 'Registro De las Empresas Progen. Abuelos', url: '/forms/business/abuelos/new', icon: 'add-outline', color:"primary"  },
    { title: 'Registro De las Empresas Rep. Pesadas', url: '/forms/business/pesada/new', icon: 'add-outline', color:"medium"  },
    { title: 'Registro De Lotes Progen. Abuelos', url: '/forms/lots/new/abuelos', icon: 'add-outline', color:"secondary"  },
    { title: 'Registro De Lotes Rep. Pesadas', url: '/lot-production', icon: 'add-outline', color:"medium"  },
    { title: 'Variables De Progen. Abuelos', url: 'rep-abuelas/variables', icon: 'settings-outline', color:"secondary"  },
    { title: 'Variables De Rep. Pesadas', url: 'rep-pesadas/variables', icon: 'settings-outline', color:"medium"  },
    //{ title: 'Variables De Pollos De Engorde', url: '/variable/edit', icon: 'settings-outline', color:"medium"  },
  ]

  constructor() { }

  ngOnInit() {
  }

}
