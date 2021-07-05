import { Body, Controller, HttpStatus, Post, Get, Query, Res, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { VideoConsultService} from './video-consult.service';
import { Response } from 'express';
import {VideoConsultDto, createRoomDto, getRoomDto } from './dto/video-consult.dto';

@Controller()
export class VideoConsultController {
    constructor(private videoConsultService: VideoConsultService){}

    @Post('generateGrantToken')
    @UsePipes(new ValidationPipe())
    async generateGrantToken(@Body() user : VideoConsultDto, @Res() res :Response ){
        try{
            const grantToken =  await this.videoConsultService.generateGrantToken(user.username,user.room);
            if(grantToken){
                res.status(HttpStatus.OK).send({'token':grantToken});
            }else{
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'Unable to generate token',
                }, HttpStatus.FORBIDDEN);
            }
        }catch(err){
            console.log("err",err);
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: err,
            }, HttpStatus.FORBIDDEN);
        }
    }

    @Post('createRoom')
    @UsePipes(new ValidationPipe())
    async createRoom(@Body() videoRoom:createRoomDto, @Res() res: Response){
        videoRoom.roomName = (videoRoom.roomName) ? videoRoom.roomName : '';
        const room = await this.videoConsultService.createRoom(videoRoom);
        if(room){
            res.status(HttpStatus.CREATED).send(room);
        }else{
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Unable to create new room with name=${videoRoom.roomName}`,
              }, HttpStatus.FORBIDDEN);
           }
    }

    @Get('getRoom')
    @UsePipes(new ValidationPipe())
    async getRoom(@Query() query: getRoomDto, @Res() res: Response){
        const roomDetails = await this.videoConsultService.getRoom(query.sid);
        if(roomDetails){
            res.status(HttpStatus.OK).send(roomDetails);
        }else{
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Unable to fetch room details with id=${query.sid}`,
              }, HttpStatus.FORBIDDEN);
           }
    }
}
