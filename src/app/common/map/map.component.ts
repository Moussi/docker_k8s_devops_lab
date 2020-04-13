import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { setRTLTextPlugin } from 'mapbox-gl';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string;
  // @ViewChild('myModal', {static: false}) openModal:ElementRef;

  lat: number = 36.8076393;
  lng: number = 10.1613743;
  show_popup: boolean = false;
  constructor(private mapService: MapService) { }

  ngOnInit() {
    
      this.mapService.getLatLonFromLocation(this.location).subscribe(
        (result) => {
           
          if(result.features.length > 0){
            let center = result.features[0].center
            const coords = {lat: center[1], lng: center[0]}
            this.mapService.cacheLocation(this.location, coords)
            this.lat = center[1]
            this.lng = center[0]
          } else {
            // this.openModal.nativeElement.click();
            this.lat = 0.0
            this.lng = 0.0
            this.show_popup = true;
          }
          
        }
      )
  }

  showPopup(){
    console.log("show poppppp => " + this.show_popup)
    this.show_popup = !this.show_popup;
  }

}
