import type { MouseEvent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
  onClickBtn?: (e: MouseEvent) => void;
};

function Button({ children, className, onClickBtn }: Props) {
  return (
    <button onClick={onClickBtn} className={className}>
      {children}
    </button>
  );
}

export default Button;
