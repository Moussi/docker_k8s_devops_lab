import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getRentals().subscribe(
      (rentals) => { this.rentals = rentals; },
      (err) => { console.log('an error occured while loadiuing rentals'); },
      () => { console.log('finish loading'); }
    );
  }
}
