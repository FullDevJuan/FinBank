import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
function Span({ children }: Props) {
  return <span className="Error">{children}</span>;
}

export default Span;
