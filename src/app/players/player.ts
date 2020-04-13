import { User } from '../security/user';

export interface Player extends User {
    id?: number;
    phoneNumber?: string;
}
