import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";
import { selectToken } from "./currentUserSlice";

function CustomRoute({ path, element }) {
  const token = useSelector(selectToken);
  const location = useLocation();
  const previousPath = location?.state?.from;

  return (
    <>
      {token ? (
        <Navigate
          state={{ from: path }}
          replace
          to={previousPath && !previousPath.includes(":") ? previousPath : "/"}
        />
      ) : (
        <Route exact path={path} element={element} />
      )}
    </>
  );
}

export default CustomRoute;
