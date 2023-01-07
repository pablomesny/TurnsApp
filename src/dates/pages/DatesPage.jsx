import { ModalDates } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { login, onSetActualDate } from "../../store";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { DateList } from "../../components/DateList";

registerLocale("es", es);

export const DatesPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const dispatch = useDispatch();

    const { actualDate } = useSelector((state) => state.ui);
    const { status } = useSelector( state => state.auth );

    const [formValue, setFormValue] = useState({});

    const onInputChange = (e, name) => {
        setFormValue({
            ...formValue,
            [name]: e,
        });
    };

    const onDateSubmit = (e) => {
        e.preventDefault();
        if(formValue.date === undefined) return;
        dispatch(onSetActualDate(formValue.date.toLocaleDateString()));
    };

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData && status !== 'authenticated') {
            dispatch(login(authData));
        }
    }, []);

    const handleOpenModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    return (
        <>
            <main className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className="py-4">TURNOS</h2>
                    </div>

                    <div className="col-3">
                        <h3 className="py-4">{actualDate}</h3>
                    </div>

                    <form className="col-3" onSubmit={onDateSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-9 d-flex align-items-center">
                                    <DatePicker
                                        className="my-4 date-search"
                                        placeholderText="Ingrese una fecha..."
                                        selected={formValue.date}
                                        locale="es"
                                        dateFormat="dd/MM/yyyy"
                                        name="date"
                                        onChange={(e) =>
                                            onInputChange(e, "date")
                                        }
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="col-3">
                                    <button type="submit" className=" my-4">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="col-3 d-flex justify-content-end h-100">
                        <button
                            className="my-4 w-100"
                            onClick={handleOpenModal}
                        >
                            Crear nuevo turno
                        </button>
                    </div>
                </div>
            </main>

            <ModalDates
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
            />

            <DateList />
            {/* // TODO: Linea divisora en css y mapear turnos del día */}
        </>
    );
};
