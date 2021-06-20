import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards';
import { NotFoundPage } from './not-found/not-found.page';
import { PathResolveService } from './services/helpers/pathResolve.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'business',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./sign-in-up/sign-in-up.module').then( m => m.SignInUpPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'producers',
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
    path: 'production/:industry',
    loadChildren: () => import('./production/production.module').then( m => m.ProductionPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'breeder/:production',
    loadChildren: () => import('./breeder/breeder.module').then( m => m.BreederPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'data-driven',
    loadChildren: () => import('./data-driven/data-driven.module').then( m => m.DataDrivenPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'monthly-data',
    loadChildren: () => import('./monthly-data/monthly-data.module').then( m => m.MonthlyDataPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'daily-projection',
    loadChildren: () => import('./daily-projection/daily-projection.module').then( m => m.DailyProjectionPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'lot-form',
    loadChildren: () => import('./lot-form/lot-form.module').then( m => m.LotFormPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'birth-entry',
    loadChildren: () => import('./birth-chiks-entry/birth-chiks-entry.module').then( m => m.BirthChiksEntryPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'births-by-weeks',
    loadChildren: () => import('./births-by-weeks/births-by-weeks.module').then( m => m.BirthsByWeeksPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'eggs-production/:estado',
    loadChildren: () => import('./eggs-production/eggs-production.module').then( m => m.EggsProductionPageModule)
  },
  {
    canActivate:[AuthGuard],
    path: 'daily-prod-projection',
    loadChildren: () => import('./daily-prod-projection/daily-prod-projection.module').then( m => m.DailyProdProjectionPageModule)
  },
  {
    path: 'docview/:id',
    loadChildren: () => import('./docview/docview.module').then( m => m.DocviewPageModule)
  },
  {
    path: '**',
    resolve: {
      path: PathResolveService
    },
    component: NotFoundPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
