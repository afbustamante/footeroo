import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-car-delete-confirmation',
  templateUrl: './car-delete-confirmation.component.html',
  styleUrls: ['./car-delete-confirmation.component.css']
})
export class CarDeleteConfirmationComponent implements OnInit {

  carId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('Asking for confirmation to delete car', this.data.carId);

    this.carId = this.data.carId;
  }

}
