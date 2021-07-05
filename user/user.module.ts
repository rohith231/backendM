import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { SigninModule } from "./signin/signin.module";
import { SignupModule } from "./signup/signup.module";
import { AuthModule } from "../auth/auth.module";
import { TrydiffwayModule } from "./trydiffway/trydiffway.module";
import { DatabaseModule } from "../database/database.module";
import { UserProvider } from "./user.provider";

@Module({
  imports: [
    DatabaseModule,
    SigninModule,
    SignupModule,
    AuthModule,
    TrydiffwayModule,
  ],

  controllers: [],
  providers: [...UserProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
{
}
