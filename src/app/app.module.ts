import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApiInterceptorService } from './services'

//Reducers
import { 
  lotsReducer, 
  producersReducer, 
  businessesReducer, 
  capacitiesReducer,
  projectionsReducer,
  egglotsReducer
} from './reducers'

//Effects
import { 
  LotsEffects, 
  ProducerEffect,
  CapacitiesEffect,
  BusinessesEffect
} from './effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule,
    StoreModule.forRoot({
      lots: lotsReducer,
      producers: producersReducer,
      capacities: capacitiesReducer,
      businesses: businessesReducer,
      projections: projectionsReducer,
      eggLots: egglotsReducer,
    }),
    EffectsModule.forRoot([
      LotsEffects,
      ProducerEffect,
      CapacitiesEffect,
      BusinessesEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    })
  ],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
