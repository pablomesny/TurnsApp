import { useSelector } from "react-redux";
import { TurnCard } from "./TurnCard";

export const TurnList = () => {

    const { registeredTurns } = useSelector((state) => state.turns);

    const { actualDate } = useSelector((state) => state.ui);

    const filteredTurns = registeredTurns.filter(
        turn => new Date(turn.date).toLocaleDateString() === actualDate
    );
    const sortedTurns = filteredTurns.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );

    return (
            <section className="container pt-2 pb-2 mw-100">
                <div className="row d-flex justify-content-center mt-3">

                    {
                        sortedTurns.length > 0 &&
                            sortedTurns.map((turn) => (
                                <TurnCard key={turn.id} turn={turn} />
                            ))
                    }

                </div>
            </section>
    );
};
