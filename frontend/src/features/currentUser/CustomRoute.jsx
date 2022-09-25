import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectToken } from "./currentUserSlice";

function CustomRoute({ path, children, ...rest }) {
  console.log({ rest });
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
        children
      )}
    </>
  );
}

export default CustomRoute;
