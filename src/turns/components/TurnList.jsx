import { compareAsc } from "date-fns";
import { TurnCard } from "./TurnCard";

export const TurnList = ({ turns }) => {

    const sortedTurns = turns.sort( (a, b) => compareAsc(new Date(a.date), new Date(b.date)) );

    return (
        <section className="container pt-2 pb-2 mw-100 card-section">
            <div className="row d-flex justify-content-center mt-3">
                {sortedTurns &&
                    sortedTurns.map(turn => (
                        <TurnCard key={turn.id} turn={turn} />
                    ))}
            </div>
        </section>
    );
};
