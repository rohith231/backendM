import { isEmpty, IsString, IsNotEmpty, isNotEmpty} from 'class-validator';

export class VideoConsultDto{
    @IsString()
    @IsNotEmpty()
    readonly username:String;

    @IsString()
    @IsNotEmpty()
    readonly room:String;
}

export class createRoomDto{
    @IsString()
    roomName:String;
}

export class getRoomDto{
    @IsString()
    @IsNotEmpty()
    readonly sid : String;
}