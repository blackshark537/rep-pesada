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

  async showToast(msg: string){
    const toast = await this.toastCtrl.create({
      animated: true,
      duration: 2000,
      message: msg,
      position: 'bottom'
    });
    await toast.present();
  }

}
