import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtEmailVerifyGuard extends AuthGuard("jwtemailverifyStrategy") {}
