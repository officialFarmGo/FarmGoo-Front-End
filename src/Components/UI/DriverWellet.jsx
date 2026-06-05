import "../../CSS/DriverWellet.css";
import MainWellet from "../MainWellet";
import Transactions from "../Transactions";

const DriverWellet = () => {
  return (
    <div className="driver-wellet-body">
      <MainWellet />
      <Transactions />
    </div>
  );
};

export default DriverWellet;
