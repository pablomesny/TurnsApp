import { getDaysBetweenDates } from '.';

export const splitTurnsByDate = ( dates = [] , turns, type ) => {

    const [ startDate, stopDate ] = dates;

    let organizedTurns = [];
    
    const dateToLocaleString = (date) => new Date(date).toLocaleDateString();
    
    const findDateIndex = (date) => organizedTurns.findIndex( turn => turn.date === date );
    
    const localeDateToParse = ( date ) => {
        
        const splitLocaleString = date.split('/');
        let dateWithTime = splitLocaleString;
        
        if( dateWithTime[0].length === 1 ) dateWithTime[0] = `0${dateWithTime[0]}`;
        if( dateWithTime[1].length === 1 ) dateWithTime[1] = `0${dateWithTime[1]}`;
        
        dateWithTime = dateWithTime.reverse().join('-');
        dateWithTime = `${dateWithTime}T00:00:00`;
        
        return Date.parse( new Date(dateWithTime) );
        
    } 

    const todayLocaleString = localeDateToParse(new Date().toLocaleDateString());

    if( turns.length === 0 ) return organizedTurns;

    if( !dates[0] && type === 'record' ){

        turns.forEach( turn => {

            if( findDateIndex(dateToLocaleString(turn.date)) === -1 ){
                organizedTurns = [
                    ...organizedTurns,
                    {
                        date: dateToLocaleString(turn.date),
                        turns: [
                            turn
                        ]
                    }
                ]

                return;
            }
            
            if( findDateIndex(dateToLocaleString(turn.date)) !== -1 ){
                organizedTurns[findDateIndex(dateToLocaleString(turn.date))].turns.push( turn );
            }
            
        })
        
        if( organizedTurns.length > 1 ){
            organizedTurns = organizedTurns.sort( (a, b) => localeDateToParse(a.date) - localeDateToParse(b.date) );
        }

        return organizedTurns;
    }

    if( dates.length === 0 || !dates[0] ){

        turns.forEach( turn => {

            if( findDateIndex(dateToLocaleString(turn.date)) === -1 && localeDateToParse(dateToLocaleString(turn.date)) >= todayLocaleString ){
                organizedTurns = [
                    ...organizedTurns,
                    {
                        date: dateToLocaleString(turn.date),
                        turns: [
                            turn
                        ]
                    }
                ]

                return;
            }
            
            if( findDateIndex(dateToLocaleString(turn.date)) !== -1 ){
                organizedTurns[findDateIndex(dateToLocaleString(turn.date))].turns.push( turn );
            }
            
        })
        
        if( organizedTurns.length > 1 ){
            organizedTurns = organizedTurns.sort( (a, b) => localeDateToParse(a.date) - localeDateToParse(b.date) );
        }

        return organizedTurns;
    }

    if( startDate && !stopDate ){

        const turnsFiltered = turns.filter( turn => dateToLocaleString(turn.date) === startDate);

        if( turnsFiltered.length > 0){
            organizedTurns = [{
                date: startDate,
                turns: turnsFiltered
            }]
        }


        return organizedTurns;
    }

    const arrayOfDates = getDaysBetweenDates( new Date(localeDateToParse(startDate)), new Date(localeDateToParse(stopDate)) );

    turns.forEach( turn => {
        
        if( arrayOfDates.includes(dateToLocaleString(turn.date)) && findDateIndex(dateToLocaleString(turn.date)) === -1 ){

            organizedTurns = [
                ...organizedTurns,
                {
                    date: dateToLocaleString(turn.date),
                    turns: [
                        turn
                    ]
                }
            ]

            return;
        }

        if( arrayOfDates.includes(dateToLocaleString(turn.date)) && findDateIndex(dateToLocaleString(turn.date)) !== -1 ){

            organizedTurns[findDateIndex(dateToLocaleString(turn.date))].turns.push( turn );
    
        }

    })

    if( organizedTurns.length > 1 ){
        organizedTurns = organizedTurns.sort( (a, b) => localeDateToParse(a.date) - localeDateToParse(b.date) );
    }
    
    return organizedTurns;
}