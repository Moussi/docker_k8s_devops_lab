import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from '../rental.component';
import { RouterModule, Routes } from '@angular/router';
import { RentalDetailComponent } from '../rental-detail/rental-detail.component';
import { RentalListComponent } from '../rental-list/rental-list.component';

const routes: Routes = [{ path: 'rentals', component: RentalComponent,
children: [
  { path: '', component: RentalListComponent },
  { path: ':rentalId', component: RentalDetailComponent}
] }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
