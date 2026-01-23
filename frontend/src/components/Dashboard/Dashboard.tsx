import DashboardActivity from "./DashboardActivity/DashboardActivity";
import DashboardQuote from "./DashboardQuote/DashboardQuote";

const Dashboard = () => {
  return (
    <section>
      <DashboardQuote />
      <DashboardActivity />
    </section>
  );
};

export default Dashboard;
