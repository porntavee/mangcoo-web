import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data: any = [];
  public audio = new Audio();
  public hubConnection: signalR.HubConnection

  //https://core148.we-builds.com/st-api/statistic
  //https://core148.we-builds.com/payment-api/payment
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://core148.we-builds.com/payment-api/payment')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
      })
      .catch(err => {
        console.log('Error while starting connection: ' + err)
      });

  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('paymentdata', (data) => {
      console.log(data);
      // data.objectData.firstWhere((e) => code == e.code);
      // if (data != null) {
        // if (!checkOrder) {
        // console.log('success');

        // postDio(server + 'm/cart/payment/update', {'code': code});
        // }

        // if (this.mounted)
        //   setState(() {
        //     checkOrder = true;
        //     currentWidget = 2;
        //     code = '';
        //   });
      // }
      console.log('receive data statistic');


    });
  }

  playAudio() {
    // this.audio.play();

    // let sound = new Audio();
    // sound.src = './assets/mixkit-retro-game-notification-212.wav';
    // sound.load();
    // sound.muted = true;
    const promise = this.audio.play();
    if (promise !== undefined) { // On older browsers play() does not return anything, so the value would be undefined.
      promise
        .then(() => {
          // Audio is playing.
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
