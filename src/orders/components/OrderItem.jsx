import { useState } from "react";
import { ModalOrders } from "./ModalOrders";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startDeleteOrder } from "../../store/orders/thunks";
import { PrintableOrder } from "./PrintableOrder";

export const OrderItem = ({ order }) => {
  const { name, lastName, phoneNumber, brand, model, defect, id = '' } = order;

  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderToPrint, setOrderToPrint] = useState(null);

  const handleOpenModal = () => {
    setIsOpenModal(prev => !prev);
  }

  const handleClearOrderToPrint = () => {
    setOrderToPrint(null);
  }

  const onDelete = () => {
    Swal.fire({
      title: "Eliminar orden",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(startDeleteOrder(order))
      }
    })
  }

  return (
    <>
      <article className="turn-card bg-green mb-4 p-4">
        <div className="col-12">
          <div className="container mw-100">
            <div className="row d-flex justify-content-center">

              <div className="col-12 col-md-3">
                {/* FIRST TEXT ROW */}
                <div className="row">
                  <div className="col-12">
                    <h4>
                      Cliente: {`${name} ${lastName}`}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h4>Teléfono: {phoneNumber}</h4>
                  </div>
                </div>
              </div>
              {/* MIDDLE TEXT ROW */}
              <div className="col-12 col-md-3">
                <div className="row h-100">
                  <div className="col-12 align-self-start">
                    <h4 className="text-break">Marca: {brand}</h4>
                  </div>
                  <div className="col-12 align-self-end">
                    <h4>Modelo: {model}</h4>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="row h-100">
                  <div className="col-12">
                    <h4 className="text-end">Nro. de Orden: {id}</h4>
                  </div>
                  <div className="col-12 align-self-end">
                    <h4 className="text-break">Defecto: {defect}</h4>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2">
                {/* BUTTONS ROW */}
                <div className="row h-100 align-items-center gap-2">
                  <div className="col-12 d-flex justify-content-center">
                    <button onClick={handleOpenModal}>
                      Modificar
                    </button>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      onClick={onDelete}
                      className="btn btn-danger"
                    >
                      Borrar
                    </button>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      onClick={() => setOrderToPrint(order)}
                      className="btn btn-secondary"
                    >
                      Imprimir orden
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>


      <ModalOrders
        initialState={{
          ...order
        }}
        isOpenModal={isOpenModal}
        handleOpenModal={handleOpenModal}
      />

      {
        orderToPrint && (
          <div className="d-none">
            <PrintableOrder order={order} handleClearOrderToPrint={handleClearOrderToPrint} />
          </div>
        )
      }
    </>
  )
}
