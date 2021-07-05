import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
@Injectable()
export class MomentService {
    moment(): moment.Moment {
        //moment.tz.setDefault();
        return moment();
    }

    formateDate(value) {
        return  moment(value).format("YYYY-MM-DD");
    }

    appointmentDatesArray(date){
        let today           = moment(date).format("YYYY-MM-DD");
        let tomorrow        = moment(today).add(1,'days').format("YYYY-MM-DD");
        let dayAfterTommow  = moment(today).add(2,'days').format("YYYY-MM-DD");
        return [today, tomorrow, dayAfterTommow];
    }
}
