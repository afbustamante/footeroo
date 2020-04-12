import { Site } from '../sites/site';
import { Player } from '../players/player';

export interface Match {
    id?: number;
    code?: string;
    date: Date;
    cancelled?: boolean;
    numPlayersMin: number;
    numPlayersMax: number;
    numRegisteredPlayers?: number;
    site: Site;
    author?: Player;
    carpoolingEnabled: boolean;
    sharingEnabled: boolean;
}
