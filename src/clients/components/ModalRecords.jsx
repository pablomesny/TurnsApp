import React from 'react';
import { Button, Modal } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { useSelector } from "react-redux";
import es from "date-fns/locale/es";
import { splitTurnsByDate } from "../../helpers";
import { useForm } from "../../hooks/useForm";
import { RecordList } from './RecordList';

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

export const ModalRecords = ({ isOpenRecordsModal, handleOpenRecordsModal, client }) => {

    const { registeredTurns } = useSelector( state => state.turns );

    const { formState, onInputChange } = useForm({
        date: [ null, null ],
        description: ''
    });

    const [ startDate, endDate ] = formState.date;

    const turnsRecord = registeredTurns.filter( turn => turn.client.id === client.id);
    const filteredTurns = splitTurnsByDate( formState.date, turnsRecord, 'record' );

  return (
    <Modal 
        show={isOpenRecordsModal} 
        onHide={handleOpenRecordsModal}
        size="lg"
        centered
        scrollable
    >
        <Modal.Header closeButton>
            <Modal.Title>
                { `Historial de turnos de ${client.name.toUpperCase()}` }
            </Modal.Title>
        </Modal.Header>
        <Modal.Body 
            className="height-350"
        >
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <input 
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Filtrar por descripción.."
                            onChange={onInputChange}
                            value={ formState.description }
                        />
                    </div>
                    <div className="col-6">
                        <DatePicker
                            className="date-search form-control"
                            popperClassName="react-datepicker-popper"
                            placeholderText="Ingrese una fecha..."
                            locale="es"
                            dateFormat="dd/MM/yyyy"
                            name="date"
                            onChange={ (e) => onInputChange(e, "date")}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            isClearable={true}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            <section className="mt-3">

                {
                    filteredTurns.length === 0 &&
                        <h4>
                            No se registran turnos
                        </h4>
                }

                {
                    filteredTurns &&
                        filteredTurns.map( (date, index) => (
                            <React.Fragment key={ index }>
                                <h4 key={ date.date } className="date-record-date d-flex w-100 justify-content-center"><div className="date-divider"><span className="date-divider-dateRecords">{ date.date }</span></div></h4>
                                  
                                <RecordList key={ date.turns[0].date } turns={ date.turns } />  
                            </React.Fragment>
                        ) )
                }

            </section>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleOpenRecordsModal}>
                Cerrar
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
