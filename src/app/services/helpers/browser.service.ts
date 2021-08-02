import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  slideOpts = {
    initialSlide: 3,
    speed: 600,
    slidesPerView: 4,
    autoplay: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  slides=true;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  async Confirm(question: string, header?: string): Promise<boolean>{
    let accept = false;
    const confirm = await this.alertCtrl.create({
      animated: true,
      header: header? header : 'Alerta',
      message: question,
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => accept = false
        },
        {
          text: 'Aceptar',
          handler: () => accept = true
        }
      ]
    });

    await confirm.present();
    await confirm.onDidDismiss();
    return accept;
  }

  async showToast(msg: string, icon?: string, status?: ToastSatusClass){
    const toast = await this.toastCtrl.create({
      animated: true,
      duration: 5000,
      message: msg,
      position: 'top',
      cssClass: status? status: ToastSatusClass.info,
      buttons:[
        {
          icon: icon? icon : 'information-circle',
          side: 'start',
        },
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  async handlError(error: HttpErrorResponse){
    console.log(error);
    this.loadingCtrl.dismiss();
    if(error.status === 0){
      this.showToast('ERR_SERVER_CONNECTION_REFUSED', 'info', ToastSatusClass.error);
      return;
    }

    if(error.status === 400){
      this.showToast(`ERROR: ${error.error?.data[0]?.messages[0]?.message}`, 'info', ToastSatusClass.info);
      return;
    }

    if(error.status === 401){
      this.showToast('ERROR ACCESO NO AUTORIZADO', 'lock-closed', ToastSatusClass.info);
      localStorage.clear();
      this.router.navigate(['/signin']);
      return;
    }

    if(error.status === 403){
      this.showToast('ERROR ACCESO PROHIBIDO', 'lock-closed', ToastSatusClass.info);
      return;
    }
  }

  configSlides(size=4){
    addEventListener('resize', ev=>{
      ev.preventDefault();
      this.configSlides();
    });

    if(window.innerWidth < 500){
      this.slideOpts.slidesPerView = 1;
      this.resetSlides();
      return this.slideOpts;
    }
    if(window.innerWidth > 500 && window.innerWidth < 1000){
      this.slideOpts.slidesPerView = 3;
      this.resetSlides();
      return this.slideOpts;
    }
    if(window.innerWidth > 1000){
      this.slideOpts.slidesPerView = size;
      this.resetSlides();
      return this.slideOpts;
    }
  }

  resetSlides(){
    this.slides=false;
    setTimeout(()=> this.slides=true, 1);
  }

}

export enum ToastSatusClass{
  error='errorIcon',
  info='primary'
}