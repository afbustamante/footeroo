import { DataSource } from "@angular/cdk/collections";
import { Observable, ReplaySubject } from "rxjs";
import { Car } from "./car";

export class CarsDataSource extends DataSource<Car> {

    private _dataStream = new ReplaySubject<Car[]>();

    constructor(carsObservable: Observable<Car[]>) {
        super();

        carsObservable.subscribe({
            next: (data) => {
                this.setData(data);
            }
        });
    }

    connect(): Observable<Car[]> {
        return this._dataStream;
    }

    disconnect(): void {
        this._dataStream.unsubscribe();
    }

    setData(data: Car[]) {
        this._dataStream.next(data);
    }
}
