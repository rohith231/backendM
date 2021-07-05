import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import * as twillo from "twilio";
import { throwError } from "rxjs";

@Injectable()
export class TwilloService implements OnModuleInit {
  private readonly TWILLO_ACCOUNT_SID: string;
  private readonly TWILLO_AUTH_TOKEN: string;
  private readonly TWILLO_SMS_SERVICE_ID: string;
  private readonly TWILLO_API_KEY: string;
  private readonly TWILLO_CHAT_SERVICE_ID:string;
  private readonly TWILLO_API_SECRET:string;
  private TwilloClient: any;

  constructor() {
    this.TWILLO_ACCOUNT_SID = process.env.TWILLO_ACCOUNT_SID;
    this.TWILLO_AUTH_TOKEN = process.env.TWILLO_AUTH_TOKEN;
    this.TWILLO_SMS_SERVICE_ID = process.env.TWILLO_SMS_SERVICE_ID;
    this.TWILLO_CHAT_SERVICE_ID = process.env.TWILLO_CHAT_SERVICE_ID;
    this.TWILLO_API_KEY = process.env.TWILLO_API_KEY;
    this.TWILLO_API_SECRET = process.env.TWILLO_API_SECRET;
  }

  async onModuleInit() {
    this.TwilloClient = twillo(this.TWILLO_ACCOUNT_SID, this.TWILLO_AUTH_TOKEN);
  }

  async sendSMS(toPhoneNumber: string, channel: string): Promise<any> {
    try {
      const verification = await this.TwilloClient.verify
        .services(this.TWILLO_SMS_SERVICE_ID)
        .verifications.create({
          channel: channel,
          to: toPhoneNumber,
        });
      return { status: verification.status, attemptSid: verification.sid };
    } catch (e) {
      return {
        twilloError: e.message,
        twillioStatus: e.status,
      };
    }
  }

  async verifyOtp(otp: number, commMedium: string): Promise<any> {
    try {
      const verificationChecks = await this.TwilloClient.verify
        .services(this.TWILLO_SMS_SERVICE_ID)
        .verificationChecks.create({
          to: commMedium,
          code: otp,
        });
      return { status: verificationChecks.status};
    } catch (e) {
      return { twillioStatus: e.message, twilloError: e.status };
    }
  }

  async sendEmail(data: String) {}

  //Generate Grant Token for Video and Chat Consultation

  async generateGrantToken(userName: String, room: String): Promise<String> {
    try {
      const AccessToken = require("twilio").jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;
      const VideoGrant = AccessToken.VideoGrant;

      const chatGrant = new ChatGrant({ serviceSid: this.TWILLO_CHAT_SERVICE_ID });
      const videoGrant = new VideoGrant({ room: room });
      const token = new AccessToken(
        this.TWILLO_ACCOUNT_SID,
        this.TWILLO_API_KEY,
        this.TWILLO_API_SECRET,
        { identity: userName }
      );
      token.addGrant(chatGrant);
      token.addGrant(videoGrant);
      return token.toJwt(); // Serialize the token to a JWT string
    } catch (e) {
      return e;
    }
  }

  async createRoom(videoRoom: any): Promise<any> {
    try {
      const roomData = await this.TwilloClient.video.rooms
        .create({
          uniqueName: videoRoom.roomName,
          type: "group",
        })
        .then((room) => {
          return room;
        })
        .catch((error) => {
          console.log(error);
        });
      return roomData;
    } catch (e) {
      return e;
    }
  }

  async getRoom(sid: any): Promise<any> {
    try {
      if (sid) {
        const roomData = await this.TwilloClient.video
          .rooms(sid)
          .fetch()
          .then((room) => {
            return room;
          })
          .catch((error) => {
            return throwError(error);
          });
        return roomData;
      } else {
        return throwError("room sid is required.");
      }
    } catch (e) {
      return e;
    }
  }
}
