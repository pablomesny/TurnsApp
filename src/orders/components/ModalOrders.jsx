import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ordersFormValidation } from '../../helpers/ordersFormValidation';
import { useDispatch } from 'react-redux';
import { startLoadingOrders, startNewOrder, startUpdateOrder } from '../../store/orders/thunks';

const emptyValues = {
  name: '',
  lastName: '',
  phoneNumber: '',
  brand: '',
  model: '',
  defect: ''
}

export const ModalOrders = ({ initialState, isOpenModal, handleOpenModal, type }) => {

  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(type === 'new' ? emptyValues : initialState);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const onResetForm = () => {
    setFormValue(emptyValues);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const isFormInvalid = ordersFormValidation(formValue);
    if (isFormInvalid) return;

    if (!!formValue.id) {
      dispatch(startUpdateOrder({
        ...formValue
      }));
      onResetForm();
      handleOpenModal();
    } else {
      dispatch(startNewOrder({
        ...formValue,
        isFinished: false
      }))
      onResetForm();
      handleOpenModal();
    }

    onResetForm();
  }

  return (
    <>
      <Modal show={isOpenModal} onHide={handleOpenModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            CREAR ORDEN
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column" onSubmit={onSubmit}>
            <div
              className="d-flex mt-2 mb-2 flex-column gap-3"
            >
              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="name"
                >
                  Nombre*
                </label>
                <input
                  id='name'
                  className="form-control w-50 ms-auto"
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="lastName"
                >
                  Apellido*
                </label>
                <input
                  id='lastName'
                  className="form-control w-50 ms-auto"
                  type="text"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="phoneNumber"
                >
                  Teléfono*
                </label>
                <input
                  id='phoneNumber'
                  className="form-control w-50 ms-auto"
                  type="number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="brand"
                >
                  Marca*
                </label>
                <input
                  id='brand'
                  className="form-control w-50 ms-auto"
                  type="text"
                  name="brand"
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="model"
                >
                  Modelo*
                </label>
                <input
                  id='model'
                  className="form-control w-50 ms-auto"
                  type="text"
                  name="model"
                  onChange={handleInputChange}
                />
              </div>

              <div className="d-flex flex-row align-items-center w-100">
                <label
                  htmlFor="defect"
                >
                  Defecto*
                </label>
                <input
                  id='defect'
                  className="form-control w-50 ms-auto"
                  type="text"
                  name="defect"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="mt-4 mb-3 w-75 mx-auto">
              Crear orden
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
