import Swal from "sweetalert2";

export const clientsFormValidation = ( formValues ) => {

    const { name, reference, telephoneNumber, email } = formValues;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if( name === '' || reference === '' || telephoneNumber === '' ) {
        Swal.fire( 'Error', 'Completar todos los campos obligatorios', 'error' );
        return true;
    }

    if( email !== '' && !emailRegex.test(email) ){
        Swal.fire( 'Error', 'El email no es válido', 'error' );
        return true;
    }
};