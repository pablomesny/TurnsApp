import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { onAddNewDate, onUpdateWorkDate } from "../store";
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { SelectInputList } from "./SelectInputList";
import { setHours, setMinutes } from "date-fns";
import { startNewWorkDate } from "../store/workdates";

registerLocale("es", es);

const excludedTimes = () => {
    let timesList = [];

    for( let i = 0; i < 25; i++ ){
        if(i < 7 || i > 16){

            timesList.push(setHours(setMinutes(new Date(), 0), i));
            timesList.push(setHours(setMinutes(new Date(), 30), i));

        }
    }

    return timesList;
}

// TODO: LOOPEAR TIMESLIST - FILTRO DE HORARIOS DEL DATEPICKER

export const ModalDates = ({ initialState = {}, isOpenModal, handleOpenModal }) => {

    const [datesFormValue, setDatesFormValue] = useState( initialState );

    useEffect(() => {
      if( Object.entries(datesFormValue).length === 0 ){
        setDatesFormValue({
            startDate: new Date(),
            client: null,
            price: 0,
            description: ''
        })
      }
    }, [datesFormValue]);

    const dispatch = useDispatch();

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const filterPassedTime = (time) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
    
      return currentDate.getTime() < selectedDate.getTime();
    };
    
    const onDateInputChange = (e, name) => {
        setDatesFormValue({
            ...datesFormValue,
            [name]: e?.toString()
        });
    }

    const onInputChange = ({ target }) => {
        if( target.name === 'client' ){
            setDatesFormValue({
                ...datesFormValue,
                [target.name]: JSON.parse(target.value)
            })
            return;
        }
        
        setDatesFormValue({
            ...datesFormValue,
            [target.name]: target.value
        })
    }

    const onSubmit = () => {
        const { startDate, client, description } = datesFormValue;
        const formIncomplete = !startDate || client === null || description === '';

        if( formIncomplete ){
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        if(!!datesFormValue.uid) {
            dispatch( onUpdateWorkDate( datesFormValue ) );
        } else {
            dispatch( startNewWorkDate( datesFormValue ) );
        }

        setDatesFormValue({});

        handleOpenModal();
    }  

    return (
        <Modal 
            show={isOpenModal} 
            onHide={handleOpenModal}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    TURNO
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label 
                            htmlFor="startDate"
                            className="w-100"
                        >
                            Fecha y hora de inicio
                        </label>

                        <DatePicker
                            showTimeSelect
                            timeCaption="Hora"
                            name="startDate"
                            placeholderText="Inicio del turno"
                            locale="es"
                            dateFormat="Pp"
                            className="form-control"
                            onChange={ e => onDateInputChange(e, "startDate") }
                            selected={ Date.parse(datesFormValue.startDate) }
                            minDate={ new Date() }
                            startDate={ new Date() }
                            filterDate={ isWeekday }
                            filterTime={ filterPassedTime }
                            excludeTimes={ excludedTimes() }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label 
                            htmlFor="clientUid"
                            className="w-100"
                        >
                            Cliente
                        </label>
                        <SelectInputList selectedClient={datesFormValue.client} onInputChange={ onInputChange } />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label 
                            htmlFor="price"
                            className="w-100"
                        >
                            Presupuesto
                        </label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="price"
                            value={ datesFormValue.price }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label 
                            htmlFor="description"
                            className="w-100"
                        >
                            Descripción
                        </label>
                    </div>
                    <div className="mt-2 mb-2 form-description">
                        <textarea 
                            className="form-control h-100" 
                            name="description" 
                            placeholder="Ingrese una descripción"
                            value={ datesFormValue.description }
                            onChange={ onInputChange }
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOpenModal}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit" onClick={ onSubmit }>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
