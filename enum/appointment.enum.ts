export enum STATUS_CODE {
    PROPOSED  = "proposed",
    PENDING   = "pending",
    BOOKED    = "booked",
    ARRIVED   = "arrived",
    FULFILLED = "fulfilled",
    CANCELLED = "cancelled",
    NOSHOW    = "noshow",
    ENTERED_IN_ERROR = "entered-in-error",
    CHECKED_IN = "checked-in",
    WAITLIST = "waitlist",
  }
  
  export enum APPOINTMENT_TYPE {
    IN_CLINIC = "in-clinic",
    TELE_CONSULTANT = "tele-consultant",
  }
  
  export enum REASON_CODE{
    CHECKUP = 'CHECKUP',
    EMERGENCY = 'EMERGENCY',
    FOLLOWUP = 'FOLLOWUP',
    ROUTINE = 'ROUTINE',
    WALKIN = 'WALKIN',
  }