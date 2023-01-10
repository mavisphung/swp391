import Navbar from "../Navbar";

const Dashboard = (Child) => {
  return (
    <div>
      <Navbar />
      <Child />
    </div>
  );
};

export default Dashboard;
