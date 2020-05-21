import { Player } from '../players/player';
import { Car } from '../cars/car';

export interface MatchRegistration {
    player: Player;
    car?: Car;
    carConfirmed?: boolean;
}
