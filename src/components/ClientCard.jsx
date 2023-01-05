export const ClientCard = ({ name, reference, telephoneNumber, email }) => {

    // TODO: Modificar y eliminar

  return (
    <article className="col-3 mt-3 mb-3">
        <h2 className="d-flex justify-content-center mb-4">
            { name.toUpperCase() }
        </h2>
        <h4 className="fs-5">
            Referencia: { reference }
        </h4>
        <h4 className="fs-5">
            Teléfono: { telephoneNumber }
        </h4>
        <h4 className="fs-5">
            Email: { email }
        </h4>
        <div className="d-flex mt-5 justify-content-around">
            <button>
                Modificar
            </button>
            <button className="btn btn-danger">
                Eliminar
            </button>
        </div>
    </article>
  )
}
