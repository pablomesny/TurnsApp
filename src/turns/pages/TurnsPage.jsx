import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { login, onSetActualDate } from "../../store";
import { startLoadingTurns } from "../../store/turns";
import { ModalTurns, TurnsByDateList } from "../components";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

export const TurnsPage = () => {

    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const { actualDate } = useSelector( state => state.ui );
    const { status } = useSelector( state => state.auth );
    const { registeredTurns, isLoading } = useSelector( state => state.turns );

    const [ dateFilter, setDateFilter ] = useState([ null, null ]);
    const [ startDate, endDate ] = dateFilter;

    useEffect(() => {
        if( registeredTurns.length === 0 ){
            dispatch(startLoadingTurns());
        }
    }, []);
    
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem("auth"));
        if (authData && status !== 'authenticated') {
            dispatch(login(authData));
        }
    }, []);

    const onInputChange = (e) => {
        setDateFilter(e);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if( startDate === null ) return dispatch(onSetActualDate([]));

        dispatch(onSetActualDate([ startDate.toLocaleDateString(), endDate?.toLocaleDateString() ]));
    };


    const handleOpenModal = () => {
        setIsOpenModal( prev => !prev );
    };

    return (
        <>
            <main className="container mb-2 mt-2">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <h2 className="py-4">TURNOS</h2>
                    </div>

                    <div className="col-12 col-md-3">
                        <h3 className="py-4">{ !!actualDate[0] ? actualDate[0] : 'Próximos turnos' }{ !!actualDate[1] ? ` - ${actualDate[1]}` : '' }</h3>
                    </div>

                    <form className="col-12 col-md-4" onSubmit={onSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-9 d-flex align-items-center">
                                    <DatePicker
                                        className="my-4 date-search form-control"
                                        placeholderText="Ingrese una fecha..."
                                        locale="es"
                                        dateFormat="dd/MM/yyyy"
                                        name="date"
                                        onChange={ (e) => onInputChange(e)}
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        isClearable={true}
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

                    <div className="col-12 col-md-3 d-flex justify-content-end h-100">
                        <button
                            className="my-4 w-100"
                            onClick={handleOpenModal}
                        >
                            Crear nuevo turno
                        </button>
                    </div>
                </div>
            </main>

            {/* LOADING SPINNER */}
            <div className="d-flex justify-content-center mt-5">
                <div className={ isLoading ? "lds-facebook" : "d-none"}><div></div><div></div><div></div></div>
            </div>

            <ModalTurns
                isOpenModal={isOpenModal}
                handleOpenModal={handleOpenModal}
                type={'new'}
            />

            <TurnsByDateList />
        </>
    );
};