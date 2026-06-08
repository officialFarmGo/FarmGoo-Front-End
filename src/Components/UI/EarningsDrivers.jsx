
import List from "../../Components/List";
import Overviwe from "../../Components/Overviwe";
import ExportReport from "../../Components/ExportReport";
import Withdrawal from "../../Components/Withdrawal";

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