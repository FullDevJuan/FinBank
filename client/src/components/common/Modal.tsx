import type { ReactNode } from "react";
import Button from "./Button";

type Props = {
  children: ReactNode;
  closeModal: () => void;
};

function Modal({ children, closeModal }: Props) {
  return (
    <div className="modal">
      <section className="modalContent">
        {children}

        <Button onClickBtn={closeModal} className="cancelSave">
          Cancel
        </Button>
      </section>
    </div>
  );
}

export default Modal;
