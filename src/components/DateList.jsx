import { useSelector } from "react-redux"
import { DateCard } from "./DateCard";

export const DateList = () => {

    const { dates } = useSelector( state => state.workDates );
    dates.map(date => console.log(date))

    return (
    <>
        { 
          dates && dates.map( date => (

            <DateCard 
                key={ date.uid }
                {...date}
            />
        ))}
    </>
  )
}
