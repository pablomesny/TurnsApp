export const RecordItem = ({ date, description }) => {
    
    const hourFromDate = date.split(" ")[4].slice(0, 5);

    return (
        <article className="d-flex mb-2">
            <div className="d-flex">
                <div className="me-2">
                    <h4 className="m-auto">{ `${ hourFromDate } - ` }</h4>
                </div>
                <p className="m-auto">Descripción: {`${description}`}</p>
            </div>
        </article>
    );
};
