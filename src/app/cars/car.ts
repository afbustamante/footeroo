import { Player } from '../players/player';

export interface Car {
    id?: number;
    name: string;
    numSeats: number;
    driver?: Player;
}
