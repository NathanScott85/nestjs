import { Post, Body, Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Post()
    addUser(@Body() body: {
        id: string,
        username: string,
        password: string;
        email: string;
    }) {
        const { id, username, password, email } = body;

        const userId = this.userService.insertUser({ id, username, password, email });

        return { userId, username, password, email }
    }
    @Get()
    getAllUsers(){
        return this.userService.getUsers()
    }
}