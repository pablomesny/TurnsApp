import { useSelector } from "react-redux";
import { filterDataBetweenDates } from "../../helpers";
import { TurnCard } from "./TurnCard";

export const TurnList = () => {

    const { registeredTurns } = useSelector((state) => state.turns);

    const { actualDate } = useSelector((state) => state.ui);

    const turns = filterDataBetweenDates( actualDate, registeredTurns );

    return (
            <section className="container pt-2 pb-2 mw-100 card-section">
                <div className="row d-flex justify-content-center mt-3">

                    {
                        turns &&
                            turns.map((turn) => (
                                <TurnCard key={turn.id} turn={turn} />
                            ))
                    }

                </div>
            </section>
    );
};
