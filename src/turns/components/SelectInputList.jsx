import { useSelector } from "react-redux";

export const SelectInputList = ({ selectedClient = {}, onInputChange }) => {

    const { registeredClients } = useSelector( state => state.clients );

  return (
    <select 
        className="form-control" 
        name="client"
        onChange={ onInputChange }
        value={ typeof selectedClient === 'object' ? JSON.stringify(selectedClient) : selectedClient }
    >
        <option value="">Seleccione un cliente</option>
        {
            registeredClients && registeredClients.map( client => {
                return <option key={ client.id } value={ JSON.stringify(client) }>{ client.name } - { client.reference }</option>
            })
        }


    </select>
  )
}
