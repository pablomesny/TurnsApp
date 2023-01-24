export const getIndex = ( array, value ) => {

    if( value === '' ) return;

    return array.findIndex( option =>  option.value.includes(value.id));

}