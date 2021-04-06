import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lot',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'lot',
    loadChildren: () => import('./lot/lot.module').then( m => m.LotPageModule)
  },
  {
    path: 'capacity',
    loadChildren: () => import('./capacity/capacity.module').then( m => m.CapacityPageModule)
  },
  {
    path: 'inventory/:capId',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'production',
    loadChildren: () => import('./production/production.module').then( m => m.ProductionPageModule)
  },
  {
    path: 'breeder',
    loadChildren: () => import('./breeder/breeder.module').then( m => m.BreederPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
