import { compareAsc } from "date-fns";
import { RecordItem } from "./RecordItem";

export const RecordList = ({ turns }) => {

    const sortedTurns = turns.sort( (a, b) => compareAsc(new Date(a.date), new Date(b.date)) );

  return (
    <section className="container mb-2 mw-100 card-section-records">
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-12">
                    {
                        sortedTurns &&
                            sortedTurns.map(turn => (
                                <RecordItem key={turn.id} {...turn} />
                            ))
                    }
                </div>
            </div>
        </section>
  )
}
