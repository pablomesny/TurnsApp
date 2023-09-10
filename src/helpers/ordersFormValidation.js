import Swal from 'sweetalert2';

export const ordersFormValidation = formValues => {
  const { name, lastName, phoneNumber, brad, model, defect } = formValues;

  if (
    name === '' ||
    lastName === '' ||
    phoneNumber === '' ||
    brad === '' ||
    model === '' ||
    defect === ''
  ) {
    Swal.fire('Error', 'Completar todos los campos obligatorios', 'error');
    return true;
  }

  return false;
};
