import cron from 'node-cron';

import ParkingTicket from '../../models/parking-ticket.js';
import MinimumRequirement from '../../models/minimum-requirements.js';

export const checkAndIncreaseActiveTicketsPrice = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const activeTickets = await ParkingTicket.find({isActive: {$eq: true}, isAmountCollected: {$eq: false}});
      const minReq = await MinimumRequirement.findOne({},{},{sort: {createdAt: -1}});
      const activeTicketsCount = await ParkingTicket.find({
        isActive: {$eq: true},
        isAmountCollected: {$eq: false}
      }).countDocuments();
      for (let index = 0; index < activeTicketsCount; index++) {
        const parkingTicket = activeTickets[index];
        const currentTime = new Date();
        const parkingTicketStartingTime = new Date(parkingTicket.startingTime);
        const parkingTicketTimeInMinutes = diff_minutes(currentTime, parkingTicketStartingTime);
        const parkingTicketTimeInHours = parkingTicketTimeInMinutes/60;
        if (parkingTicketTimeInHours > 1){
          parkingTicket.amount = (parkingTicketTimeInHours * minReq.min2WheelerHourly)+ (minReq.min2WheelerPerMinute * (parkingTicketTimeInMinutes % 60));
          await parkingTicket.save();
        }
      }
      console.log('CRON executed');
    } catch (err) {
      console.log(err);
    }
  });
};

const diff_minutes = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
