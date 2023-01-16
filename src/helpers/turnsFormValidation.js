import Swal from "sweetalert2"

export const turnsFormValidation = ( formValues ) => {

    const { startDate, client, description} = formValues;

    if ( client === '' || description === '' ) {
        Swal.fire( 'Error', 'Completar todos los campos obligatorios', 'error');
        return true;
    }

    if ( typeof startDate === 'object' ) {
        Swal.fire( 'Fecha incorrecta', 'Debe seleccionar una nueva fecha', 'error');
        return true;
    }

}