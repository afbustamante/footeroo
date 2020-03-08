import { User } from '../security/user';

export class Player extends User {
    id: number;
    phoneNumber: string;
}
