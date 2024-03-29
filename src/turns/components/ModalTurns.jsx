import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import es from "date-fns/locale/es";
import { ModalClients } from '../../clients/components';
import { excludedTimes, filterPassedTime, getIndex, getSelectOptions, isWeekday, turnsFormValidation } from "../../helpers";
import { useForm } from "../../hooks";
import { startLoadingClients } from "../../store/clients";
import { startNewTurn, startUpdateTurn } from "../../store/turns";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const emptyValues = {
  date: '',
  client: '',
  price: '',
  description: ''
};

export const ModalTurns = ({ initialState, isOpenModal, handleOpenModal, type }) => {

  const dispatch = useDispatch();

  const { registeredTurns } = useSelector(state => state.turns);
  const { registeredClients } = useSelector(state => state.clients);

  const { formState, onInputChange, onResetForm } = useForm(
    type === 'new'
      ? emptyValues
      : initialState
  );

  const [isOpenModalClients, setIsOpenModalClients] = useState(false);

  const { date, client, price, description } = formState;

  useEffect(() => {
    if (registeredClients.length === 0) {
      dispatch(startLoadingClients())
    }
  }, []);

  const onSubmit = (e) => {

    e.preventDefault();

    if (turnsFormValidation(formState, registeredTurns)) return;

    if (!!formState.id) {
      dispatch(startUpdateTurn({
        ...formState,
        date: new Date(formState.date).toString()
      }));
    } else {
      dispatch(startNewTurn({
        ...formState,
        date: formState.date.toString(),
        client: JSON.parse(formState.client)
      }));
    }

    onResetForm();

    handleOpenModal();
  }

  const onPressEnter = (e) => {
    if (e.key === 'Enter') onSubmit(e);
  }

  const handleOpenClientsModal = () => {
    setIsOpenModalClients(prev => !prev);
  }

  const selectOptions = getSelectOptions(registeredClients);
  const indexOfClient = getIndex(selectOptions, client);

  return (
    <>
      <Modal
        show={isOpenModal}
        onHide={handleOpenModal}
        size="lg"
        centered
        className={isOpenModalClients ? "d-none" : "d-block"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {type === 'new' ? 'CREAR TURNO' : 'MODIFICAR TURNO'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='turnsForm' onSubmit={onSubmit} onKeyDown={onPressEnter}>
            <div
              className="d-flex align-items-center mt-2 mb-2"
            >
              <label
                htmlFor="date"
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
                onChange={e => onInputChange(e, "date")}
                selected={date}
                minDate={new Date()}
                startDate={new Date()}
                filterDate={isWeekday}
                filterTime={filterPassedTime}
                excludeTimes={excludedTimes()}
                autoComplete='off'
                isClearable={true}
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

              <button className="me-2" type="button" onClick={handleOpenClientsModal}>
                +
              </button>

              <Select
                className='w-100'
                placeholder='Seleccione un cliente'
                options={selectOptions}
                onChange={e => onInputChange(e, "client")}
                defaultValue={indexOfClient >= 0 ? selectOptions[indexOfClient] : ''}
              />

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
                value={price}
                onChange={onInputChange}
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
                value={description}
                onChange={onInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOpenModal}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" form='turnsForm'>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalClients
        isOpenModal={isOpenModalClients}
        handleOpenModal={handleOpenClientsModal}
        type="new"
        backdrop
      />
    </>
  );
};
