import { CarForm } from "../cars/car-form";

export interface MatchRegistrationForm {
    car_id?: number,
    car?: CarForm,
    car_confirmed?: boolean,
}
