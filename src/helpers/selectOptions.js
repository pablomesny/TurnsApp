export const selectOptions = (registeredClients) => {

    let options = [];

    registeredClients.forEach( client => {
        options.push({ value: JSON.stringify(client), label: `${ client.name } - ${ client.reference }`});
    });

    options = options.sort( (a, b) => a.label.localeCompare(b.label) );

    return options;
}