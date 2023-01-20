import { useState } from "react";
import { useDispatch } from "react-redux";
import { startDeleteTurn } from "../../store/turns";
import { ModalTurns } from "./ModalTurns";
import Swal from "sweetalert2";

export const TurnCard = ({ turn }) => {

    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    const { date, price, description, client: { name, reference, telephoneNumber } } = turn;

    const hourFromDate = date.split(" ")[4].slice(0, 5);
    const daysFromDate = new Date(date).toLocaleDateString();

    const onDelete = () => {
        Swal.fire({
            title: "Eliminar turno",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteTurn(turn));
            }
        });
    };

    return (
        <>

                {/* GENERAL ROW */}
                <article className="turn-card mb-4 p-4">
                    <div className="col-12">
                        <div className="container mw-100">
                            <div className="row">

                    <div className="col-3">
                        {/* FIRST TEXT ROW */}
                        <div className="row">
                            <div className="col-12">
                                <h3>
                                    {daysFromDate} - {hourFromDate}
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4>
                                    Cliente: {name} - {reference}
                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h4>Teléfono: {telephoneNumber}</h4>
                            </div>
                        </div>
                    </div>
                    {/* MIDDLE TEXT ROW */}
                    <div className="col-7">
                        <div className="row h-100">
                            <div className="col-12 align-self-start">
                                <h4>Descripción: {description}</h4>
                            </div>
                            <div className="col-12 align-self-end">
                                <h4>Presupuesto: { price === '' ? 'Sin definir' : `$ ${ price }` }</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        {/* BUTTONS ROW */}
                        <div className="row h-100 align-items-center">
                            <div className="col-12 d-flex justify-content-center">
                                <button onClick={handleOpenModal}>
                                    Modificar
                                </button>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <button
                                    onClick={onDelete}
                                    className="btn btn-danger"
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                    </div>
                </article>
            

            <ModalTurns
                initialState={{
                    ...turn,
                    date: Date.parse(turn.date)
                }}
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
            />
        </>
    );
};
