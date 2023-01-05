import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onAddNewDate, onCloseDatesModal, setActiveDate } from "../store";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { SelectInputList } from "./SelectInputList";

registerLocale("es", es);

const initialState = {
    startDate: '',
    client: '',
    price: '',
    description: '',
}

// TODO: CAMBIAR INPUT DE CLIENTE A SELECT Y AGREGAR UID DE CLIENTE (MOSTRAR OPTION DE NOMBRE DEL CLIENTE) || ACTIVEDATE DE REDUX STATE -----------------------------------------

export const ModalDates = () => {

    const dispatch = useDispatch();

    const { isDatesModalOpen } = useSelector((state) => state.ui);

    const handleCloseModal = () => {
        dispatch(onCloseDatesModal());
    };

    const [datesFormValue, setDatesFormValue] = useState(initialState);

    const onDateInputChange = (e, name) => {
        setDatesFormValue({
            ...datesFormValue,
            [name]: e.toString()
        });
    }

    const onInputChange = ({ target }) => {
        console.log(target);
        setDatesFormValue({
            ...datesFormValue,
            [target.name]: target.value
        })
    }

    const onSubmit = () => {
        dispatch( onAddNewDate( onCreateNewDate() ) );
        setDatesFormValue(initialState);
        handleCloseModal();
    }  
    
    const onCreateNewDate = () => {
        return {
            ...datesFormValue,
            uid: new Date().getTime()
        }
    }

    return (
        <Modal 
            show={isDatesModalOpen} 
            onHide={handleCloseModal}
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

                        {/* <input 
                            className="form-control" 
                            type="text" 
                            name="client"
                            value={ datesFormValue.client }
                            onChange={ e => onInputChange(e) }
                        /> */}
                        <SelectInputList onInputChange={ onInputChange } />
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
                            maxLength={10}
                            value={ datesFormValue.description }
                            onChange={ onInputChange }
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit" onClick={ onSubmit }>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
