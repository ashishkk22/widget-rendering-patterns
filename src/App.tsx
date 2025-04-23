import "./App.css";
import Dashboard from "./Features/Dashboard/Components/Dashboard";
import { registerDashboardDataSources } from "./Features/Dashboard/DataSources/registration";

export default function App() {
  return <Dashboard />;
}

registerDashboardDataSources();
