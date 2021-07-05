import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJWT(req: any, options: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync({ req }, options);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  comparePasswords(
    newPassword: string,
    passwortHash: string
  ): Promise<boolean> {
    return bcrypt.compare(newPassword, passwortHash);
  }
}
