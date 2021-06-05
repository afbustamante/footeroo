import { Site } from '../sites/site';
import { Player } from '../players/player';
import { MatchRegistration } from './match-registration';

export interface Match {
    id?: number;
    code?: string;
    date: Date;
    status?: string;
    sport: string;
    numPlayersMin: number;
    numPlayersMax: number;
    numRegisteredPlayers?: number;
    site: Site;
    creator?: Player;
    carpoolingEnabled: boolean;
    codeSharingEnabled: boolean;
}
