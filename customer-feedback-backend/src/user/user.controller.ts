/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, Role } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./strategy/roles.guard";
import { Roles } from "./roles.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")

export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  @Post("create")
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }


  @Post("login")
  login(@Body() dto: { email: string; password: string }) {
    return this.userService.login(dto.email, dto.password);
  }

  // Logout
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Post("logout")
  @Roles(Role.ADMIN,Role.CUSTOMER)
  logout(@Req() req, @Body() body: { refreshToken: string }) {
    
    const accessToken = req.headers.authorization.split(" ")[1];
    
    return this.userService.logout(accessToken, body.refreshToken);
  }

  @Post("refresh")
  refresh(@Body() body: { refreshToken: string }) {
    return this.userService.refreshTokens(body.refreshToken);
  }
  // GET CURRENT USER
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Get("me")
  @Roles(Role.ADMIN,Role.CUSTOMER)
  getMe(@Req() req) {
    return req.user;
  }

  // ADMIN ONLY: get all users
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Roles(Role.ADMIN)
  @Get("all")
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // ADMIN ONLY: update user role
  @UseGuards(AuthGuard("jwt"),RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  removeRole(@Param("id") id:string){
    return this.userService.deleteUser(id)
  }
}
