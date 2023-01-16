import Swal from "sweetalert2";

export const clientsFormValidation = ( formValues ) => {

    const { name, reference, telephoneNumber } = formValues;

    if( name === '' || reference === '' || telephoneNumber === '' ) {
        Swal.fire( 'Error', 'Completar todos los campos obligatorios', 'error' );
        return true;
    }
}