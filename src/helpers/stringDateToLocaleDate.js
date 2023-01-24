export const stringDateToLocaleDate= ( dates = [] ) => {

    let datesTransformed = [];

    dates.forEach( date => {
        if( date !== null ) datesTransformed.push( new Date(date).toLocaleDateString())
    });

    return datesTransformed;
};