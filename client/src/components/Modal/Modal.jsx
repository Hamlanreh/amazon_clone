import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ message }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <section className="modal">
          <div className="modal__content">
            <button className="modal__closeBtn" onClick={() => setShow(!show)}>
              <span className="modal__closeIcon">✖</span>
            </button>
            <h2 className="modal__message">{message}</h2>
          </div>
        </section>
      )}
    </>
  );
};

export default Modal;
