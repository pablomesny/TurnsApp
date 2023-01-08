import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { onDeleteClient } from "../store";
import { ModalClients } from "./ModalClients";

export const ClientCard = ({ client }) => {

    console.log(client)

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal( prev => !prev );
    }

    const dispatch = useDispatch();

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
                dispatch(onDeleteClient(client));
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
