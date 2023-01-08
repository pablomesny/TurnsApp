import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { onDeleteWorkDate } from "../store";
import { ModalDates } from "./ModalDates";

export const DateCard = ({ date }) => {

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    const dispatch = useDispatch();

    const { startDate, price, description, client:{ name, reference, telephoneNumber } } = date;

    const hourFromDate = startDate.split(" ")[4].slice(0, 5);
    const daysFromDate = new Date(startDate).toLocaleDateString();

    /* const { name, reference, telephoneNumber } = client; */

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
                dispatch(onDeleteWorkDate(date));
            }
        });
    };

    return (
        <>
            <section className="container pt-2 pb-2 mw-100">
                {/* GENERAL ROW */}
                <article className="row">
                    <div className="col-3">
                        {/* FIRST TEXT ROW */}
                        <div className="row">
                            <div className="col-12">
                                <h2>
                                    {daysFromDate} - {hourFromDate}
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p>
                                    Cliente: {name} - {reference}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <p>Teléfono: {telephoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    {/* MIDDLE TEXT ROW */}
                    <div className="col-7">
                        <div className="row h-100">
                            <div className="col-12 align-self-start">
                                <p>Descripcion: {description}</p>
                            </div>
                            <div className="col-12 align-self-end">
                                <p>Presupuesto: ${price}</p>
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
                </article>
            </section>

            <ModalDates
                initialState={date}
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
            />
        </>
    );
};
