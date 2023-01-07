import { useSelector } from "react-redux";

// TODO: Fix onchange

export const SelectInputList = ({ onInputChange }) => {

    const { registeredClients } = useSelector( state => state.clients );

  return (
    <select 
        className="form-control" 
        name="client"
        onChange={ onInputChange }
    >
        <option value="">Seleccione un cliente</option>
        {
            registeredClients && registeredClients.map( client => {
                return <option key={ client.uid } value={ JSON.stringify(client) }>{ client.name } - { client.reference }</option>
            })
        }


    </select>
  )
}
