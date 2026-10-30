'use client';

import { createPortal } from 'react-dom'
import css from './Modal.module.css'

/*'use client';

import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div>
      <div>
        {children}
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;*/
//*********************************************************** */



import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children , onClose}: Props) => {
  const router = useRouter();
  
  const close = () => {
    if (onClose) { onClose(); }
    else {
      router.back();
    }
  };

  const modalRoot = document.getElementById('modal-root');
  const targetContainer = modalRoot || document.body;

  return createPortal(
    /*********************************************************** */
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={close}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}

         <button onClick={close}>
          Close
        </button>
                
      </div>
    </div>,

    targetContainer

    //document.getElementById('modal-root') as HTMLDivElement,
  );
};

export default Modal;
