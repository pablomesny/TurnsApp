import { useSelector } from "react-redux";
import { DateCard } from "./DateCard";

export const DateList = () => {

    const { dates } = useSelector((state) => state.workDates);

    const { actualDate } = useSelector((state) => state.ui);

    const filteredDates = dates.filter(
        date => new Date(date.startDate).toLocaleDateString() === actualDate
    );
    const sortedDates = filteredDates.sort(
        (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
    );

    return (
        <>
            {sortedDates.length > 0 &&
                sortedDates.map((date) => (
                    <DateCard key={date.id} date={date} />
                ))}
        </>
    );
};
