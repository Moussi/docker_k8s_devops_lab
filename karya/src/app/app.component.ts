import { Component } from '@angular/core';
import { setRTLTextPlugin } from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'karya';

  constructor() {
    setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
      , (error) => {
          // tslint:disable-next-line: quotemark
          console.log("issue while setting arabic encoding")
      });
  }
}
