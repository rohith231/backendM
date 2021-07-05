import { Injectable } from '@nestjs/common';
import { AnyARecord } from 'dns';
import {TwilloService} from './../twillo/twillo.service';

@Injectable()
export class VideoConsultService {
    constructor(
        private twilloService : TwilloService
        ){}
    async generateGrantToken(userName: String, room: String) : Promise<String>{
        return  await this.twilloService.generateGrantToken(userName,room);
    }

    async generateMeetingLink(appointment,roomId):Promise<any>{
        console.log("appointment",appointment) 
        const {clinic,provider,speciality,participant,patient,id} = appointment;
        let encodeObject:any = {};
        encodeObject.clinic = clinic.id;
        encodeObject.provider = provider.id;
        encodeObject.speciality = speciality.id;
        encodeObject.participant = participant;
        encodeObject.patient = patient.id;
        encodeObject.appoinementId = id;
        console.log("encodeObject",encodeObject)
        const frontendUrl = process.env.UI_SERVER_URL;
        const encodedInformaion = encodeURI(encodeObject);
        console.log("frontendUrl",frontendUrl);
        console.log("encoded link",frontendUrl+'/'+encodedInformaion);
        return frontendUrl+'?info='+encodedInformaion;
    }

    async createRoom(videoRoom:any):Promise<any>{
        return await this.twilloService.createRoom(videoRoom);
    }

    async getRoom(sid:any):Promise<any>{
        return await this.twilloService.getRoom(sid);
    }
    
}
