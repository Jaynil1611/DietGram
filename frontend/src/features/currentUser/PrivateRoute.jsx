import { Navigate, Route } from "react-router";
import { getTokenFromLocalStorage } from "../../utils";

function PrivateRoute({ path, element }) {
  const token = getTokenFromLocalStorage();
  return (
    <>
      {token ? (
        <Route exact path={path} element={element} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
