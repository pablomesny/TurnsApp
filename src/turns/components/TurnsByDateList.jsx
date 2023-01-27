import React from "react";
import { useSelector } from "react-redux";
import { splitTurnsByDate } from "../../helpers";
import { TurnList } from "./TurnList";

export const TurnsByDateList = () => {

    const { registeredTurns } = useSelector((state) => state.turns);
    const { isLoading } = useSelector( state => state.turns );
    const { actualDate } = useSelector((state) => state.ui);

    const dateByTurns = splitTurnsByDate( actualDate, registeredTurns );

    return (
        <>
            {
                dateByTurns.length === 0 && !isLoading &&
                    <h4 className="text-center">
                        No se registran turnos.
                    </h4>
            }

            {
                dateByTurns.length > 0 &&
                    dateByTurns.map( (date, index) => (
                        <React.Fragment key={index}>
                            <h4 key={ date.date } className="d-flex w-100 justify-content-center"><div className="date-divider"><span>{ date.date }</span></div></h4>

                            <TurnList key={ new Date().getTime() } turns={date.turns}/>
                        </React.Fragment>
                    ))
            }
        </>
    );
};
