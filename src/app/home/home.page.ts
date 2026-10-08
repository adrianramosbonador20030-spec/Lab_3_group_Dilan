import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  x = signal(1);

  accelX = signal(0);
  accelY = signal(0);
  accelZ = signal(0);

  sensitivity = 5;

  constructor() {
    this.basic();
  }

  async vibrate() {
    try {
      await Haptics.impact({
        style: ImpactStyle.Medium
      });
    } catch {
    }
  }

  async roll() {
    this.x.set(Math.floor(Math.random() * 6) + 1);
    await this.vibrate();
  }

  async basic() {
    await Motion.addListener('accel', (event) => {

      this.accelX.set(event.acceleration?.x ?? 0);
      this.accelY.set(event.acceleration?.y ?? 0);
      this.accelZ.set(event.acceleration?.z ?? 0);

      if (Math.abs(this.accelX()) > this.sensitivity) {
        this.roll();
      }

    });
  }
}
