import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalComponent } from './rental.component';
import { RentalRoutingModule } from './rental-routing/rental-routing.module';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';



@NgModule({
  declarations: [
    RentalListItemComponent,
    RentalListComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RentalRoutingModule,
    NgPipesModule,
    MapModule
  ]
})
export class RentalModule { }
