import { useMeQuery } from "../../store/auth/authApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Dashboard = () => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const demoUser = useSelector((state: RootState) => state.app.user);

  const { data: backendUser, isLoading } = useMeQuery(undefined, {
    skip: mode !== "backend",
  });

  if (mode === "backend" && isLoading) {
    return <div>Ładowanie...</div>;
  }

  const user = mode === "backend" ? backendUser : demoUser;

  return <div>Witaj {user?.name}!</div>;
};

export default Dashboard;
