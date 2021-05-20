import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  async Confirm(question: string, header?: string): Promise<boolean>{
    let accept = false;
    const confirm = await this.alertCtrl.create({
      animated: true,
      header: header? header : 'Alert',
      message: question,
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => accept = false
        },
        {
          text: 'Okay',
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
      return;
    }

    if(error.status === 403){
      this.showToast('ERROR ACCESO PROHIBIDO', 'lock-closed', ToastSatusClass.info);
      return;
    }
  }

}

export enum ToastSatusClass{
  error='errorIcon',
  info='primary'
}