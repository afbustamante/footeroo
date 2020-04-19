import { Site } from '../sites/site';
import { Player } from '../players/player';
import { MatchRegistration } from './match-registration';

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
    registrations?: MatchRegistration[];
}
