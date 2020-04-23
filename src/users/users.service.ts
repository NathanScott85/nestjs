import { Injectable } from "@nestjs/common";
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import { IUser } from "./interface";

@Injectable()
export class UsersService {
    private users: User[] = [];

    insertUser({ username, password, email }: IUser) {
        const id = uuid();
        const newUser = new User({ id, username, password, email });
        this.users.push(newUser);
        return id;
    }
    getUsers(){
        console.log(...this.users)
        return [...this.users]
    }
}