import { isEmpty, IsString, IsNotEmpty, isNotEmpty, IsNumber} from 'class-validator';

export class FetchProviderDto{
  
    @IsNotEmpty()
    readonly speciality:number;

    @IsNotEmpty()
    readonly date:Date;

    @IsNotEmpty()
    readonly patient:number;
}