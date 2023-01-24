export const RecordItem = ({ date, description }) => {
    return (
        <article className="d-flex mb-2">
            <div className="d-flex">
                <h4>{`${new Date(date).toLocaleDateString()} - `}</h4>
                <p>Descripción: {`${description}`}</p>
            </div>
        </article>
    );
};
