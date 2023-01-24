import { useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm";
import { Button, Modal } from "react-bootstrap";
import { filterDataBetweenDates, stringDateToLocaleDate } from "../../helpers";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useRef } from "react";

registerLocale("es", es);

export const ModalRecords = ({ isOpenRecordsModal, handleOpenRecordsModal, client }) => {

    const { registeredTurns } = useSelector( state => state.turns );

    const { formState, onInputChange } = useForm({
        date: [ null, null ],
        description: ''
    });

    const [ startDate, endDate ] = formState.date;

    const turnsRecord = registeredTurns.filter( turn => turn.client.id === client.id);
    const turnsFilteredByDate = filterDataBetweenDates( stringDateToLocaleDate(formState.date), turnsRecord );
    const turnsFiltered = turnsFilteredByDate.filter( turn => turn.description.toLowerCase().includes( formState.description.toLowerCase() ) );

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
                    turnsFiltered.length === 0 &&
                        <h4>
                            No se registran turnos
                        </h4>
                }

                {
                    turnsFiltered &&
                        turnsFiltered.map( turn => (
                            <article key={turn.id} className="d-flex mb-2">
                                <div className="d-flex">
                                    <h4>
                                        { `${ new Date(turn.date).toLocaleDateString()} - ` }
                                    </h4>
                                    <p>
                                        Descripción: { `${ turn.description}` }
                                    </p>
                                </div>
                            </article>
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
