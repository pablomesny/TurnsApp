import { ModalDates, NavBar } from "../../components";
import { useDispatch } from "react-redux";
import { login, onOpenDatesModal } from "../../store";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

registerLocale("es", es);

export const DatesPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if(authData){
        dispatch( login(authData) );   
    }
  }, [])

  const handleOpenModal = () => {
    dispatch( onOpenDatesModal() );
  }

    return (
        <>
            <main>
                <h2
                  className="py-4"
                >
                  TURNOS
                </h2>
                {/* // TODO: Agregar fecha desde el estado */}
                <h3
                  className="py-4"
                >
                  Fecha
                </h3>

                <form>
                  <div>
                    <DatePicker
                        className="my-4"
                        placeholderText="Ingrese una fecha..."
                        locale="es"
                        dateFormat="Pp"
                    />
                  </div>
                  <div>
                    <button type="submit" className=" my-4">
                        Buscar
                    </button>
                  </div>
                </form>

                <button 
                  className="my-4"
                  onClick={ handleOpenModal }
                >
                    Crear nuevo turno
                </button>


            </main>

                <ModalDates />

              {/* // TODO: Linea divisora en css y mapear turnos del día */}
        </>
    );
};
