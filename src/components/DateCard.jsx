export const DateCard = ({ startDate, price, description, uid, client }) => {

    const hourFromDate = startDate.split(" ")[4].slice(0, 5);
    const daysFromDate = new Date(startDate).toLocaleDateString();

    const { name, reference, telephoneNumber} = client;

    return (
        <section className="container pt-2 pb-2 mw-100">
            {/* GENERAL ROW */}
            <article className="row">
                <div className="col-3">
                    {/* FIRST TEXT ROW */}
                    <div className="row">
                        <div className="col-12">
                            <h2>{ daysFromDate } - { hourFromDate }</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>Cliente: { name } - { reference }</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>Teléfono: { telephoneNumber }</p>
                        </div>
                    </div>
                </div>
                {/* MIDDLE TEXT ROW */}
                <div className="col-7">
                    <div className="row h-100">
                        <div className="col-12 align-self-start">
                            <p>Descripcion: { description}</p>
                        </div>
                    <div className="col-12 align-self-end">
                        <p>Presupuesto: ${ price }</p>
                    </div>
                    </div>
                </div>
                <div className="col-2">
                    {/* BUTTONS ROW */}
                    <div className="row h-100 align-items-center">
                        <div className="col-12 d-flex justify-content-center">
                            <button>Modificar</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-danger">Borrar</button>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};
