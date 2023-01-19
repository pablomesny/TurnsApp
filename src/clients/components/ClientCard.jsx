import { useState } from "react";
import { useDispatch } from "react-redux";
import { startDeleteClient } from "../../store/clients";
import { ModalClients } from "./ModalClients";
import Swal from "sweetalert2";

export const ClientCard = ({ client }) => {

    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal( prev => !prev );
    }

    const { name, reference, telephoneNumber, email } = client;

    const onDelete = () => {
        Swal.fire({
            title: "Eliminar cliente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteClient(client));
            }
        });
    };

    return (
        <>
            <article className="col-3 mt-3 mb-3">
                <h2 className="d-flex justify-content-center mb-4">
                    {name.toUpperCase()}
                </h2>
                <h4 className="fs-5">Referencia: {reference}</h4>
                <h4 className="fs-5">Teléfono: {telephoneNumber}</h4>
                <h4 className="fs-5">Email: {email}</h4>
                <div className="d-flex mt-5 justify-content-around">
                    <button onClick={handleOpenModal}>Modificar</button>
                    <button onClick={onDelete} className="btn btn-danger">
                        Eliminar
                    </button>
                </div>
            </article>

            <ModalClients 
                initialState={ client }
                isOpenModal={ isOpenModal }
                handleOpenModal={ handleOpenModal }
            />
        </>
    );
};
