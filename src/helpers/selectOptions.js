export const selectOptions = (registeredClients) => {

    let options = [];

    registeredClients.forEach( client => {
        options.push({ value: JSON.stringify(client), label: `${ client.name } - ${ client.reference }`});
    })

    return options;
}