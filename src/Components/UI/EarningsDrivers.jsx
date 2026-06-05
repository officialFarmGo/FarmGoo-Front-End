import "../../CSS/EarningsDrivers.css";
import List from "./List";
import Overviwe from "./Overviwe";
import ExportReport from "./ExportReport";
import Withdrawal from "./Withdrawal";

const EarningsDrivers = () => {
  return (
    <div className="earnings-drivers-container">
      <List />
      <Overviwe />
      <ExportReport />
      <Withdrawal />
    </div>
  );
};

export default EarningsDrivers;