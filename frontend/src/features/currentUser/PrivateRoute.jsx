import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router";

function PrivateRoute({ path, element }) {
  const token = useSelector((state) => state.currentUser.token);

  return (
    <>
      {token ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
