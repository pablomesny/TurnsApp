import Swal from "sweetalert2"

export const turnsFormValidation = ( formValues, registeredTurns ) => {

    const { date, client, description } = formValues;

    const dateTime = new Date(date).toLocaleTimeString().split(':');
    const dateHour = Number(dateTime[0]);
    const dateMinutes = Number(dateTime[1]);
    const dateSeconds = Number(dateTime[2]);

    const validDate = dateHour >= 7 && dateHour <= 16 && (dateMinutes === 30 || dateMinutes === 0) && dateSeconds === 0;

    if ( client === '' || description === '' ) {
        Swal.fire( 'Error', 'Completar todos los campos obligatorios', 'error');
        return true;
    }

    if ( !validDate ) {
        Swal.fire( 'Fecha incorrecta', 'Debe seleccionar una nueva fecha', 'error');
        return true;
    }

    const dateUnavailable = registeredTurns.some( turn => turn.date === date.toString());

    if( dateUnavailable ) {
        Swal.fire( 'Turno ocupado', 'Seleccione un turno disponible', 'error' );
        return true;
    }

}