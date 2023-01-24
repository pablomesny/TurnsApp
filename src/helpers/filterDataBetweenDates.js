export const filterDataBetweenDates = ( dates = [], dataToFilter ) => {

    if( dates.length === 0 || dates[0] === null){
        return (
            dataToFilter
                .filter( data => Date.parse(data.date) > new Date().getTime())
                .sort( (a, b) => Date.parse(a.date) - Date.parse(b.date) )
        )
    }
        

    if( dates[0] && !dates[1] ) return dataToFilter.filter( data => new Date(data.date).toLocaleDateString() === dates[0] );

    const reversedDate = (date) => {

        let reversedDate = [];
        const dateToArray = date.split('/');

        dateToArray[0].length === 1 ? reversedDate.push(`0${dateToArray[0]}`) : reversedDate.push(dateToArray[0]);
        dateToArray[1].length === 1 ? reversedDate.push(`0${dateToArray[1]}`) : reversedDate.push(dateToArray[1]);
        reversedDate.push(dateToArray[2]);

        reversedDate = reversedDate.reverse().join('-');

        return reversedDate;
    }
    
    const filteredData = dataToFilter.filter( data => 
        new Date(data.date) >= new Date(`${reversedDate(dates[0])}T00:00`) 
        && new Date(data.date) <= new Date(`${reversedDate(dates[1])}T23:59:59`)
    );
    
    return filteredData.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
};