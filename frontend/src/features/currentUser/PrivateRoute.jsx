import { Navigate } from "react-router";
import { getTokenFromLocalStorage } from "../../utils";

function PrivateRoute({ path, children }) {
  const token = getTokenFromLocalStorage();
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
