import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeleteClient } from '../../store/clients';
import { ModalClients } from './ModalClients';
import { ModalRecords } from './ModalRecords';

export const ClientCard = ({ client }) => {
    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenRecordsModal, setIsOpenRecordsModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(prev => !prev);
    };

    const handleOpenRecordsModal = () => {
        setIsOpenRecordsModal(prev => !prev);
    }

    const { name, reference, telephoneNumber, email } = client;

    const onDelete = () => {
        Swal.fire({
            title: 'Eliminar cliente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(startDeleteClient(client));
            }
        });
    };

    return (
        <>
            <article className="col-12 col-sm-6 col-lg-4 col-xl-3 mt-3 mb-3 d-flex justify-content-center bg-green">
                <div className="client-card p-3">
                    <h2 className="d-flex justify-content-center mb-4 d-inline-block pb-3">
                        {name.toUpperCase()}
                    </h2>
                    <h4 className="fs-5">Referencia: {reference}</h4>
                    <h4 className="fs-5">Teléfono: {telephoneNumber}</h4>
                    <h4 className="fs-5">
                        Email: {email ? email : 'No registrado'}
                    </h4>
                    <div className="d-flex mt-4 justify-content-around">
                        <button onClick={handleOpenModal}>
                            Modificar
                        </button>
                        <button onClick={onDelete} className="btn btn-danger">
                            Eliminar
                        </button>
                    </div>
                    <div className="d-flex mt-3 justify-content-center">
                        <button onClick={handleOpenRecordsModal}>
                            Ver historial de turnos
                        </button>
                    </div>
                </div>
            </article>

            <ModalClients
                initialState={client}
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
            />

            <ModalRecords 
                isOpenRecordsModal={isOpenRecordsModal}
                handleOpenRecordsModal={handleOpenRecordsModal}
                client={client}
            />
        </>
    );
};
