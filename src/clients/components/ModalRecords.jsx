import { useSelector } from "react-redux"
import { Button, Modal } from "react-bootstrap";

export const ModalRecords = ({ isOpenRecordsModal, handleOpenRecordsModal, client }) => {

    const { registeredTurns } = useSelector( state => state.turns );

    const turnsRecord = registeredTurns.filter( turn => turn.client.id === client.id);
    const sortedRecord = turnsRecord.sort( (a, b) => Date.parse(a.date) - Date.parse(b.date) );

  return (
    <Modal 
            show={isOpenRecordsModal} 
            onHide={handleOpenRecordsModal}
            size="lg"
            centered
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    { `Historial de turnos de ${client.name.toUpperCase()}` }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section>
                    {
                        sortedRecord &&
                            sortedRecord.map( turn => (
                                <article key={turn.id} className="d-flex mb-2">
                                    <div className="d-flex">
                                        <h4>
                                            { `${ new Date(turn.date).toLocaleDateString()} - ` }
                                        </h4>
                                        <p>
                                            { `${ turn.description}` }
                                        </p>
                                    </div>
                                </article>
                            ) )
                    }
                </section>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="secondary" onClick={handleOpenRecordsModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
  )
}
