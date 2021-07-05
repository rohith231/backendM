export default interface ContactPoint
{
   
    system : SystemCode;          // C? phone | fax | email | pager | url | sms | other
    value : string;               // The actual contact point details
    use  :ContactCode ;           // home | work | temp | old | mobile - purpose of this contact point
    rank : number;              // Specify preferred order of use (1 = highest)
    period : { start:Date,end:Date } // Time period when the contact point was/is in use
  }


export enum ContactCode{
    HOME,
    WORK,
    TEMP,
    OLD,
    MOBILE
}

export enum  SystemCode{
  PHONE,
  FAX,
  SMS,
  PAGER,
  URL,
  OTHER
}