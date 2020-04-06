import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';


@NgModule({
  declarations: [MapComponent],
  exports: [ MapComponent ],
  imports: [
    CommonModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYXltZW5tb3Vzc2kiLCJhIjoiY2szem9pcTBlMXJ0dDNsbzFzenh3NTVlYSJ9.ZS1xGzYOJxTJ_V_Iqf_o6Q', // sk.eyJ1IjoiYXltZW5tb3Vzc2kiLCJhIjoiY2szem9seWVxMDVjeDNnb3Jxc3h3NmVvbyJ9.FyXEZevEATbcV_quUpCEXw
      geocoderAccessToken: 'pk.eyJ1IjoiYXltZW5tb3Vzc2kiLCJhIjoiY2szem9pcTBlMXJ0dDNsbzFzenh3NTVlYSJ9.ZS1xGzYOJxTJ_V_Iqf_o6Q' // sk.eyJ1IjoiYXltZW5tb3Vzc2kiLCJhIjoiY2szem9seWVxMDVjeDNnb3Jxc3h3NmVvbyJ9.FyXEZevEATbcV_quUpCEXw
    })
  ],
  providers: [ MapService, CamelizePipe  ]
})
export class MapModule { }
