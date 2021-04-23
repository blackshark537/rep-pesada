import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  /* {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, */
  {
    canActivate:[AuthGuard],
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'lot/:id',
    loadChildren: () => import('./lot/lot.module').then( m => m.LotPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'capacity',
    loadChildren: () => import('./capacity/capacity.module').then( m => m.CapacityPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'inventory/:capId',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'production',
    loadChildren: () => import('./production/production.module').then( m => m.ProductionPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'breeder',
    loadChildren: () => import('./breeder/breeder.module').then( m => m.BreederPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./sign-in-up/sign-in-up.module').then( m => m.SignInUpPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
