import { Column, PrimaryColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  primaryMobileNo: string;

  @Column({ nullable: true })
  fname: string;

  @Column({ nullable: true })
  lname: string;

  @Column()
  dob: Date;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  mobileNumber2: string;

  @Column({ nullable: true })
  mobileNumber3: string;

  @Column({ nullable: true })
  address1: string;
  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  zip: number;

  @Column({ nullable: true })
  securityQestion1: string;

  @Column({ nullable: true })
  securityAnswer1: string;

  @Column({ nullable: true })
  securityQestion2: string;

  @Column({ nullable: true })
  securityAnswer2: string;

  @Column({ nullable: true })
  securityQestion3: string;

  @Column({ nullable: true })
  securityAnswer3: string;

  @Column({ nullable: true })
  resetLink: string;

  @Column({ default: 0 })
  attempts: number;

  @Column({ nullable: true })
  emailState: string;
}
