import Swal from "sweetalert2"

export const turnsFormValidation = ( formValues, registeredTurns ) => {

    const { date, client, description } = formValues;

    const getMinutes = Number(new Date(date).toLocaleTimeString().split(':')[1]);

    if ( client === '' || description === '' ) {
        Swal.fire( 'Error', 'Completar todos los campos obligatorios', 'error');
        return true;
    }

    if ( getMinutes !== 30 && getMinutes !== 0 ) {
        Swal.fire( 'Fecha incorrecta', 'Debe seleccionar una nueva fecha', 'error');
        return true;
    }

    const dateUnavailable = registeredTurns.some( turn => turn.date === date.toString());

    if( dateUnavailable ) {
        Swal.fire( 'Turno ocupado', 'Seleccione un turno disponible', 'error' );
        return true;
    }

}