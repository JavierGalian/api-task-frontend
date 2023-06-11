import PropTypes from 'prop-types';
import '../styles/modal.css'

function Modal ({children, isOpen, closeModal}) {
    const handleModalContainerClick = (e) => e.stopPropagation()
    return (
        <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
            <div className="modal-container" onClick={handleModalContainerClick}>
                <button className="modal-close" onClick={closeModal}>x</button>
                {children}
            </div>
        </article>
    )

}

export default Modal


Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};
