import { forwardRef, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const PrintableOrder = ({ order, handleClearOrderToPrint }) => {

  const { name, lastName, phoneNumber, brand, model, defect, id } = order;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Orden Nro. ${id} - Electrónica Mesny`,
    onAfterPrint: () => handleClearOrderToPrint()
  })

  useEffect(() => {
    handlePrint();
  }, [order]);

  return (
    <div ref={componentRef}>
      <div className="container my-5 mx-5" style={{ height: '45vh', width: '100vw' }}>
        <div className="row mt-5">
          <div className="col-12 font-bold fs-6">
            Electrónica Mesny
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-end">
            <span className="fs-5 me-5">Nro. de Orden: {id}</span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            Nombre: {name}
          </div>
          <div className="col-4">
            Apellido: {lastName}
          </div>
          <div className="col-4">
            Teléfono: {phoneNumber}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            Marca: {brand}
          </div>
          <div className="col-6">
            Modelo: {model}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            Defecto: {defect}
          </div>
        </div>
      </div>
      <div className='text-center'>
        -----------------------------------------------------
      </div>
      <div className="container my-5 mx-5" style={{ height: '55vh', width: '100vw' }}>
        <div className="row mt-5">
          <div className="col-12 font-bold fs-6">
            Electrónica Mesny
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-end">
            <span className="fs-5 me-5">Nro. de Orden: {id}</span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            Nombre: {name}
          </div>
          <div className="col-4">
            Apellido: {lastName}
          </div>
          <div className="col-4">
            Teléfono: {phoneNumber}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            Marca: {brand}
          </div>
          <div className="col-6">
            Modelo: {model}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            Defecto: {defect}
          </div>
        </div>
      </div>
    </div>
  )
};
