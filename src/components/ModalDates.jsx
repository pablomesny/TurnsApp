import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewDate, onResetActiveWorkDate, onUpdateWorkDate, setActiveWorkDate } from "../store";
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { SelectInputList } from "./SelectInputList";

registerLocale("es", es);

/* const initialState = {
    startDate: new Date(),
    client: '',
    price: '',
    description: '',
} */

// TODO: CAMBIAR INPUT DE CLIENTE A SELECT Y AGREGAR UID DE CLIENTE (MOSTRAR OPTION DE NOMBRE DEL CLIENTE) || ACTIVEDATE DE REDUX STATE -----------------------------------------

export const ModalDates = ({ isOpenModal, handleOpenModal }) => {

    const dispatch = useDispatch();

    const { activeWorkDate } = useSelector( state => state.workDates );

    const [datesFormValue, setDatesFormValue] = useState(activeWorkDate);

    useEffect(() => {
      setDatesFormValue( activeWorkDate );
    }, [activeWorkDate]);
    

    useEffect(() => {
      dispatch(setActiveWorkDate( datesFormValue ));
    }, [datesFormValue]);
    

    const onDateInputChange = (e, name) => {
        setDatesFormValue({
            ...datesFormValue,
            [name]: e.toString()
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
        const formIncomplete = datesFormValue.startDate === '' || datesFormValue.client === '' || datesFormValue.price === '' || datesFormValue.description === '';

        if( formIncomplete ){
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        if(!!datesFormValue.uid) {
            dispatch( onUpdateWorkDate( datesFormValue ) );
        } else {
            dispatch( onAddNewDate( onCreateDateUid() ) );
        }

        dispatch( onResetActiveWorkDate());
        handleOpenModal();
    }  
    
    const onCreateDateUid = () => {
        return {
            ...datesFormValue,
            uid: new Date().getTime()
        }
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
