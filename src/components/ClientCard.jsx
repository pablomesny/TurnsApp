import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { onDeleteClient, setActiveClient } from "../store";

export const ClientCard = ({ client, handleOpenModal }) => {

    const dispatch = useDispatch();

    const { name, reference, telephoneNumber, email } = client;

    // TODO: Modificar y eliminar

    const onUpdate = () => {
        dispatch( setActiveClient( client ) );
        handleOpenModal();
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Eliminar cliente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( onDeleteClient( client ) );
            }
          })
    }

  return (
    <article className="col-3 mt-3 mb-3">
        <h2 className="d-flex justify-content-center mb-4">
            { name.toUpperCase() }
        </h2>
        <h4 className="fs-5">
            Referencia: { reference }
        </h4>
        <h4 className="fs-5">
            Teléfono: { telephoneNumber }
        </h4>
        <h4 className="fs-5">
            Email: { email }
        </h4>
        <div className="d-flex mt-5 justify-content-around">
            <button onClick={ onUpdate }>
                Modificar
            </button>
            <button onClick={ onDelete } className="btn btn-danger">
                Eliminar
            </button>
        </div>
    </article>
  )
}
