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

 
  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  logout(@Req() req, @Body() body: { refreshToken: string }) {
    
    const accessToken = req.headers.authorization.split(" ")[1];
    
    return this.userService.logout(accessToken, body.refreshToken);
  }

  @Post("refresh")
  refresh(@Body() body: { refreshToken: string }) {
    return this.userService.refreshTokens(body.refreshToken);
  }
  
  @UseGuards(AuthGuard("jwt"))
  @Get("me")
  getMe(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  @Get("all")
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id")
  updateRole(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  removeRole(@Param("id") id:string){
    return this.userService.deleteUser(id)
  }
}
