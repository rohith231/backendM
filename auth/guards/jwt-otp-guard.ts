import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class JwtOtpAuthGuard extends AuthGuard("jwtotpverifyStrategy") {}
