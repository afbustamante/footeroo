import { User } from '../security/user';

export class Player extends User {
    firstName: string;
    surname: string;
    phoneNumber: string;
}
