import { useSelector } from "react-redux"
import { DateCard } from "./DateCard";

export const DateList = () => {

    const { dates } = useSelector( state => state.workDates );

    const { actualDate } = useSelector( state => state.ui );

    return (
    <>
        { 
          dates && 
            dates
            .filter( date => new Date(date.startDate).toLocaleDateString() === actualDate)
            .map( date => (

            <DateCard 
                key={ date.id }
                date={ date }
            />
        ))}
    </>
  )
}
