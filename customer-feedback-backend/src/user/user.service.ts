import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async createUser(dto: CreateUserDto) {
    // admin only
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ForbiddenException('Email already in use');
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: dto.role ?? Role.CUSTOMER,
      },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ForbiddenException('Invalid credentials');

    const accessToken = await this.signAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const refreshToken = uuidv4();

    // Save refresh token
    const expiresAt = add(new Date(), { days: 7 });
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: expiresAt,
      },
    });

    return { accessToken, refreshToken, user: user.role };
  }

  signAccessToken(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };
    return this.jwtService.signAsync(payload);
  }

  async logout(accessToken: string, refreshToken: string) {
    // Blacklist access token
    await this.prisma.revokedToken.create({
      data: { token: accessToken, reason: 'logout' },
    });
    // Delete refresh token
    await this.prisma.refreshToken.delete({ where: { token: refreshToken } });
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(refreshToken: string) {
    const record = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!record) throw new ForbiddenException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: { id: record.userId },
    });
    if (!user) throw new ForbiddenException('User not found');

    const newAccessToken = this.signAccessToken(user.id, user.email, user.role);
    return { accessToken: newAccessToken };
  }

  async isTokenRevoked(token: string) {
    const found = await this.prisma.revokedToken.findUnique({
      where: { token },
    });
    return !!found;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async updateUser(id: string, dto: UpdateUserDto) {
  if (dto.password) {
    dto.password = await bcrypt.hash(dto.password, 10);
  }

  const user =  await this.prisma.user.update({
    where: { id },
    data:{
      name:dto.name,
      email:dto.email,
      password:dto.password,
      role:dto.role,
    },
  });
  return user;
}

  async deleteUser(id:string)
  { 
    return this.prisma.user.delete({
      where:{id},
    })
  }
}
