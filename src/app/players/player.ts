import { User } from '../security/user';

export interface Player extends User {
    id: number;
    phone_number?: string;
}
