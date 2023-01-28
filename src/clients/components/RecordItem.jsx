export const RecordItem = ({ date, description }) => {
    
    const hourFromDate = date.split(" ")[4].slice(0, 5);

    return (
        <article className="d-flex align-items-center mb-2">
            <div className="modal-records-item-div d-flex align-items-center">
                <div className="d-flex align-items-center pe-2">
                    <h4>{ `${ hourFromDate } - ` }</h4>
                </div>
                <div className="d-flex align-items-center">
                    <p className="d-block text-break">Descripción: {`${description}`}</p>
                </div>
            </div>
        </article>
    );
};
