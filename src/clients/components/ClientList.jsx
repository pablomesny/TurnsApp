import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";

export const ClientList = ({ clientsFilter }) => {
    
    const { registeredClients } = useSelector( state => state.clients);

    const filteredClients = registeredClients.filter( client => client.name.toLowerCase().startsWith(clientsFilter.toLowerCase()))

    return (
        <section className="client-list container mw-100 mt-4">
            <div className="row">
                {
                    filteredClients.length > 0 &&
                        filteredClients.map((client) => (
                         <ClientCard key={client.id} client={client} />
                    ))
                }
            </div>
        </section>
    );
};
