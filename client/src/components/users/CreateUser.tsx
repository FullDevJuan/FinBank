import type { Users } from "../../types/user.types";
import Modal from "../common/Modal";
import UsersForm from "./UsersForm";

type Props = {
  closeModal: () => void;
  onSubmit: (data: Users) => void;
};

function CreateUser({ closeModal, onSubmit }: Props) {
  return (
    <Modal closeModal={closeModal}>
      <UsersForm onSubmit={onSubmit} />
    </Modal>
  );
}

export default CreateUser;
