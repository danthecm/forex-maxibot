const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Hi {user.user.username ? user.user.username.toUpperCase() : "Dear"}</h1>
      <p>Welcome to the Maxibot Forex</p>
    </div>
  );
};

export default Dashboard;
