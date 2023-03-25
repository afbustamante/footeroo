import { Site } from '../sites/site';
import { Player } from '../players/player';

export interface Match {
    id: number;
    code: string;
    date: Date;
    status: string;
    sport: string;
    num_players_min?: number;
    num_players_max?: number;
    num_registered_players?: number;
    site: Site;
    creator?: Player;
    carpooling_enabled: boolean;
    code_sharing_enabled: boolean;
}
