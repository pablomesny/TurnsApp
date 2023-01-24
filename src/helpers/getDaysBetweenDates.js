import { addDays } from "date-fns";

export const getDaysBetweenDates = ( startDate, stopDate ) => {

    let dateArray = [];
    let currentDate = startDate;

    if( !startDate ) return;
    
    if( stopDate ) {

        while( currentDate <= stopDate ){
            dateArray.push( currentDate );
            currentDate = addDays( currentDate, 1 );
        }

        for( let i = 0; i < dateArray.length; i++ ){
            dateArray[i] = dateArray[i].toLocaleDateString();
        }

        return dateArray;
    }

    return currentDate.toLocaleDateString();
}