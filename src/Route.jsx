import Signpage from "./Auth/SignPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign" element={<Signpage />} />
      </Routes>
    </Router>
  );
};
