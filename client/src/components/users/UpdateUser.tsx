import Modal from "../common/Modal";
import UsersForm from "./UsersForm";
import type { Users } from "../../types/user.types";

type Props = {
  user: Users;
  closeModal: () => void;
  onSubmit: (data: Users) => void;
};

function UpdateUser({ user, closeModal, onSubmit }: Props) {
  return (
    <Modal closeModal={closeModal}>
      <UsersForm defaultValues={user} onSubmit={onSubmit} />
    </Modal>
  );
}

export default UpdateUser;
