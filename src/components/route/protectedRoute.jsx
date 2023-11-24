import PropTypes from "prop-types";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { Loading } from "../../pages/loading";

export function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/" />;

  return children;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};
