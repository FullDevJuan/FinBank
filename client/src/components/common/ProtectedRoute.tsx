import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const user = sessionStorage.getItem("user");
  const userRole = user ? JSON.parse(user).rol : null;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}