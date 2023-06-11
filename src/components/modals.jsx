import Modal from "./modal"
import { useModal } from "../hooks/useModal"
import CreateForm from "./createForm"

function Modals () {
    const [isOpenModal1,openModal1,closeModal1]=useModal(false)

    return(
        <div>
            <h2>Modals</h2>
            <button onClick={openModal1}>Modals</button>
            <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
                <CreateForm/>
            </Modal>
        </div>
    )
}

export default Modals