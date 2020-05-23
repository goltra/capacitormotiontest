import { Component, NgZone } from '@angular/core';
import { Plugins, MotionEventResult, MotionOrientationEventResult } from '@capacitor/core';
const { Device } = Plugins;
const { Motion } = Plugins;
const info = Device.getInfo();


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  accel;
  ori;
  infoObject
  constructor(private zone: NgZone) {
    let a = { nombre: 'pepe', apellido: 'garcia' };
    console.log('a=>', a);
    info.then(res => {
      this.infoObject = JSON.stringify(res,null,4)
      console.log('Device.getinfo()=>', this.infoObject);
    })
    // this.getMotion();

  }
  watchAccel() {
    const watchListener = Plugins.Motion.addListener('accel', (values) => {
      this.zone.run(() => {
        const v = {
          x: values.acceleration.x.toFixed(4),
          y: values.acceleration.y.toFixed(4),
          z: values.acceleration.z.toFixed(4)
        }
        this.accel = v;
      });
    });

    setTimeout(() => {
      watchListener.remove();
    }, 5000);
  }

  watchOrientation() {
    const watchListener = Plugins.Motion.addListener('orientation', (values) => {
      this.zone.run(() => {
        const v = {
          alpha: values.alpha.toFixed(4),
          beta: values.beta.toFixed(4),
          gamma: values.gamma.toFixed(4)
        }
        this.ori = v;
      });
    });
    setTimeout(() => {
      watchListener.remove();
    }, 5000);
  }

}
