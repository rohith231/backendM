import { Injectable, Inject } from "@nestjs/common";
import { User } from "./user.entity";
import { AuthService } from "../auth/auth.service";
import * as _ from "lodash";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
    private authService: AuthService
  ) {}
  async findOne(req: any): Promise<User> {
    return await this.userRepository.findOne(req);
  }

  async findById(id: string) {
    return await this.userRepository.findOne(id);
  }

  async createUser(user): Promise<User> {
    // const hashedPassword = await this.authService.hashPassword(user.password);
    // const updatatedUser = { password: hashedPassword };
    //  user = _.extend(user, updatatedUser);
    user.attempts = 0;
    return this.userRepository.save(user);
  }

  async updateOne(where: any, update: any) {
    
   return await  this.userRepository.update(where, update)  
  }

  isUser(obj: any): obj is User {
    return "primaryMobileNo" in obj;
  }
  isProfileComplete(user: User) {
    const { address1, zip, securityAnswer1, securityAnswer2, securityAnswer3 } =
      user;
    return (
      address1 != null &&
      zip != 0 &&
      securityAnswer1 != null &&
      securityAnswer2 != null &&
      securityAnswer3 != null
    );
  }

  async deleteUser(id):Promise<any>{
    return await this.userRepository.delete(id); 
  }
}
