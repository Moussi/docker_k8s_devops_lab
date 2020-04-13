import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {

  map_token: string;

  locationsCache: any = {}
 

  constructor(private http: HttpClient, private camelizePipe: CamelizePipe) {
    this.map_token = environment.map_token;
  }

  cacheLocation(location: string, coordinates: any) {
    const camelizedLocation = this.camelizePipe.transform(location);
    this.locationsCache[camelizedLocation] = coordinates;
  }

  getLocationCache(){
    return this.locationsCache;
  }



  getLatLonFromLocation(location: string): Observable<any>{
    let url: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
                                              location+'.json?access_token='+this.map_token;

    return this.http.get(url)
  }
}
