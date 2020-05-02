import { Player } from '../players/player';

export interface Car {
    name: string;
    numSeats: number;
    driver?: Player;
    passengers?: Player[];
}
