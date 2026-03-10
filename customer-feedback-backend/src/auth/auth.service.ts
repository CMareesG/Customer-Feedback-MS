import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Dummy users
  private users = [
    {
      id: 1,
      email: 'admin@test.com',
      password:
        '$2b$10$$2b$10$9zK9vZl0xA6jzFvYwP7VXeFQhXKZV6wq6x2sZ1PZgG9Z8gF2p7P8C', // hashed "admin123"
      role: 'ADMIN',
    },
    {
      id: 2,
      email: 'user@test.com',
      password: '$2b$10$9zK9vZl0xA6jzFvYwP7VXeFQhXKZV6wq6x2sZ1PZgG9Z8gF2p7P8C', // hashed "admin123"
      role: 'USER',
    },
  ];

  async validateUser(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);

    console.log('User found:', user);

    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    async function testHash() {
      const hash = await bcrypt.hash('admin123', 10);
      console.log(hash);
    }

    testHash();

    console.log('Password match:', isMatch);

    if (!isMatch) throw new UnauthorizedException();

    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
