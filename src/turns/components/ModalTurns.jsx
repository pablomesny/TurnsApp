import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { setHours, setMinutes } from "date-fns";
import { startNewTurn, startUpdateTurn } from "../../store/turns";
import { turnsFormValidation } from "../../helpers";
import { startLoadingClients } from "../../store/clients";
import { SelectInputList } from "./SelectInputList";

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

const emptyValues = {
    date: new Date(),
    client: '',
    price: '',
    description: ''
};

export const ModalTurns = ({ initialState, isOpenModal, handleOpenModal, type }) => {

    const dispatch = useDispatch();

    const { registeredClients } = useSelector( state => state.clients );

    const [turnsFormValue, setTurnsFormValue] = useState( 
        type === 'new' 
            ? emptyValues
            : initialState
     );

    useEffect(() => {
      if( registeredClients.length === 0 ) {
        dispatch(startLoadingClients())
      }
    }, []);
    
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
        setTurnsFormValue({
            ...turnsFormValue,
            [name]: e.toString()
        });
    }

    const onInputChange = ({ target }) => {
        if( target.name === 'client' ){
            setTurnsFormValue({
                ...turnsFormValue,
                [target.name]: JSON.parse(target.value)
            })
            return;
        }
        
        setTurnsFormValue({
            ...turnsFormValue,
            [target.name]: target.value
        })
    }

    const onSubmit = () => {
        if( turnsFormValidation(turnsFormValue) ) return;

        if(!!turnsFormValue.id) {
            dispatch( startUpdateTurn( turnsFormValue ) );
        } else {
            dispatch( startNewTurn( turnsFormValue ) );
        }

        setTurnsFormValue(emptyValues);

        handleOpenModal();
    }  

    const onPressEnter = (e) => {
        if( e.key === 'Enter' ) onSubmit();
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
                <form onSubmit={onSubmit} onKeyDown={onPressEnter}>
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
                            name="date"
                            placeholderText="Inicio del turno"
                            locale="es"
                            dateFormat="Pp"
                            className="form-control"
                            onChange={ e => onDateInputChange(e, "date") }
                            selected={ Date.parse(turnsFormValue.date) }
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

                        <SelectInputList selectedClient={turnsFormValue.client} onInputChange={ onInputChange } />

                    </div>
                    <div
                        className="d-flex align-items-center mt-2 mb-2"
                    >
                        <label 
                            htmlFor="price"
                            className="w-100"
                        >
                            Presupuesto (opcional)
                        </label>
                        <input 
                            className="form-control" 
                            type="number" 
                            name="price"
                            value={ turnsFormValue.price }
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
                            value={ turnsFormValue.description }
                            onChange={ onInputChange }
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOpenModal}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
