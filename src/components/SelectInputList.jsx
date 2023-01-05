import { useSelector } from "react-redux";

// TODO: Fix onchange

export const SelectInputList = ({ onInputChange }) => {

    const { registeredClients } = useSelector( state => state.clients );

  return (
    <select 
        className="form-control" 
        name="client"
        onChange={ (e) => onInputChange(e) }
    >
        <option value="">Seleccione un cliente</option>
        {
            registeredClients && registeredClients.map( client => (
                <option key={ client.uid } value={ client }>{ client.name } - { client.reference }</option>
            ))
        }


    </select>
  )
}
