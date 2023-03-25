import { SiteForm } from "../sites/site-form";

export interface MatchForm {
    date: Date;
    sport: string;
    num_players_min?: number;
    num_players_max?: number;
    site_id?: number;
    site?: SiteForm;
    carpooling_enabled: boolean;
    code_sharing_enabled: boolean;
}
