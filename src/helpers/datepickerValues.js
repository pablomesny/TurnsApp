import { setHours, setMinutes } from "date-fns";

export const excludedTimes = () => {
    let timesList = [];

    for( let i = 0; i < 25; i++ ){
        if(i < 7 || i > 16){

            timesList.push(setHours(setMinutes(new Date(), 0), i));
            timesList.push(setHours(setMinutes(new Date(), 30), i));

        }
    }

    return timesList;
}

export const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
  
    return currentDate.getTime() < selectedDate.getTime();
};


export const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
};