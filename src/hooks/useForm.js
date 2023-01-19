import { useState } from "react";

export const useForm = ( initialForm = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );

	const onInputChange = (e, name = e.target.name) => {

        if( name === 'date' ){
            setFormState({
                ...formState,
                [name]: e
            })
            return;
        }

		setFormState({
			...formState,
			[ name ]: e.target.value
		})

    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        formState,
        onInputChange,
        onResetForm
    }
}