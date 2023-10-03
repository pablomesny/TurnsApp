import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const PrintableOrder = ({ order, handleClearOrderToPrint }) => {

  const { name, lastName, phoneNumber, brand, model, article = '', defect, uniqueId } = order;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Orden Nro. ${uniqueId} - Electrónica Mesny`,
    onAfterPrint: () => handleClearOrderToPrint()
  })

  useEffect(() => {
    handlePrint();
  }, [order]);

  return (
    <div ref={componentRef}>
      <div className="container my-5 mx-5" style={{ height: '30vh', width: '100vw', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '20%', fontSize: '4rem', opacity: 0.4, fontFamily: 'Merriweather', textAlign: 'center' }}>
          ELECTRÓNICA MESNY
        </div>
        <div className="row mt-5">
          <div className="col-12 font-bold fs-6" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            ELECTRÓNICA MESNY - Necochea 3274 - Teléfono (342) - 6 980 774
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-end">
            <span className="fs-5 me-5">Nro. de Orden: {uniqueId}</span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Marca:</span> {brand}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Modelo:</span> {model}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Artículo</span> {article ? article : 'S/D'}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Defecto:</span> {defect}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-center" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
            ***** CLIENTE *****
          </div>
        </div>
      </div>
      <div className='text-center'>
        -----------------------------------------------------
      </div>
      <div className="container my-5 mx-5" style={{ width: '100vw' }}>
        <div className="row mt-2">
          <div className="col-12 font-bold fs-6" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            ELECTRÓNICA MESNY
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12 text-end">
            <span className="fs-5 me-5">Nro. de Orden: {uniqueId}</span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Nombre:</span> {name}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Apellido:</span> {lastName}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Teléfono:</span> {phoneNumber}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Marca:</span> {brand}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Modelo:</span> {model}
          </div>
          <div className="col-4">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Artículo:</span> {article ? article : 'S/D'}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <span style={{ fontSize: '1.2rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Defecto:</span> {defect}
          </div>
        </div>
      </div>
    </div>
  )
};
