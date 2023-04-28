import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from '../car';
import { CarDeleteConfirmationComponent } from '../car-delete-confirmation/car-delete-confirmation.component';
import { CarsDataSource } from '../cars-data-source';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css']
})
export class CarManagementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'numSeats', 'actions'];
  cars$: Observable<Car[]>;
  myCars: CarsDataSource;

  constructor(
    private carsService: CarsService,
    private dialog: MatDialog,
    private messageSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cars$ = this.carsService.findCars();
    this.myCars = new CarsDataSource(this.cars$);
  }

  openDeleteCarConfirmationDialog(carId: number, carName: string): void {
    const dialogRef = this.dialog.open(CarDeleteConfirmationComponent, {
      width: '400px',
      data: {
        carId,
        carName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // API call to remove the car
        const carId = Number.parseInt(result);

        this.carsService.removeCar(carId).subscribe({
          next: (response) => {
            this.messageSnackBar.open(`You have successfully deleted this car: ${carName}`, 'OK', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          },
          error: (error) => {
            this.messageSnackBar.open(error.error.message, 'OK', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
          }
        });

        this.router.navigate(['/cars']);
      }
    });
  }
}
