import { useSelector } from "react-redux";
import { TurnCard } from "./TurnCard";

export const TurnList = () => {

    const { registeredTurns } = useSelector((state) => state.turns);

    const { actualDate } = useSelector((state) => state.ui);

    const filteredTurns = () => {

        if( actualDate.length === 0 ) {
            console.log('filtrado proximos');
            return registeredTurns.filter( turn => Date.parse(turn.date) > new Date().getTime());
        }

        if( actualDate[0] && !actualDate[1] ) {
            console.log('filtrado una sola fecha')
            return registeredTurns.filter( turn => new Date(turn.date).toLocaleDateString() === actualDate[0] );
        }

        const reversedDate = (date) => {

            let reversedDate = [];
            const dateToArray = date.split('/');

            dateToArray[0].length === 1 ? reversedDate.push(`0${dateToArray[0]}`) : reversedDate.push(dateToArray[0]);
            dateToArray[1].length === 1 ? reversedDate.push(`0${dateToArray[1]}`) : reversedDate.push(dateToArray[1]);
            reversedDate.push(dateToArray[2]);

            reversedDate = reversedDate.reverse().join('-');

            return reversedDate;
        }
        
        return registeredTurns.filter( turn => 
            new Date(turn.date) >= new Date(`${reversedDate(actualDate[0])}T00:00`) 
            && new Date(turn.date) <= new Date(`${reversedDate(actualDate[1])}T23:59:59`)
        );
    }

    const sortedTurns = filteredTurns().sort(
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
