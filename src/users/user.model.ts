import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "./interface";


export class User {
    @ApiProperty({ description: 'The id assigned to the user', type: String })
    public id: string;

    @ApiProperty({ description: 'the username of the user', type: String,  })
    public username: string;

    @ApiProperty({ description: 'The password of the user', type: String })
    public password: string;

    @ApiProperty({ description: 'Email address of the user example@email.com', type: String })
    public email: string;

    constructor({id, username, password, email}: IUser) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email
    }
}