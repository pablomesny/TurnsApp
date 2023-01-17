import { useSelector } from "react-redux";

export const SelectInputList = ({ selectedClient = {}, onInputChange }) => {

    const { registeredClients } = useSelector( state => state.clients );

  return (
    <select 
        className="form-control" 
        name="client"
        onChange={ onInputChange }
        value={ selectedClient?.id ? JSON.stringify(selectedClient) : '' }
    >
        <option disabled value="">Seleccione un cliente</option>
        {
            registeredClients && registeredClients.map( client => {
                return <option key={ client.id } value={ JSON.stringify(client) }>{ client.name } - { client.reference }</option>
            })
        }


    </select>
  )
}
