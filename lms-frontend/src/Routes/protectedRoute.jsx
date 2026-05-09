import { Navigate, useLocation } from "react-router-dom";
import { useGetUserHook } from "@/hooks/userhook";
import { useUserStore } from "@/Store/user.store";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const { data: user, isLoading } = useGetUserHook();
  const location = useLocation();
  console.log("loatin",location)
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;