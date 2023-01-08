import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";

export const ClientList = ({ clientsFilter }) => {

    const { registeredClients } = useSelector((state) => state.clients);

    console.log(registeredClients)

    return (
        <section className="container mw-100">
            <div className="row">
                {
                    registeredClients
                        .filter( client => client.name.toLowerCase().startsWith(clientsFilter.toLowerCase()))
                        .map( client => (
                    <ClientCard 
                        key={client.uid} 
                        client={ client }
                    />
                ))}
            </div>
        </section>
    );
};
