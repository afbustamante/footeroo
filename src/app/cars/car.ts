import { Player } from '../players/player';

export interface Car {
    id: number;
    name: string;
    num_seats: number;
    num_passengers?: number;
    driver?: Player;
}
