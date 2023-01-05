import { useSelector } from "react-redux";
import { ClientCard } from "./ClientCard";

export const ClientList = () => {
    const { registeredClients } = useSelector((state) => state.clients);

    return (
        <section className="container mw-100">
            <div className="row">
                {
                    registeredClients.map((client) => (
                    <ClientCard 
                        key={client.uid} 
                        {...client} 
                    />
                ))}
            </div>
        </section>
    );
};
