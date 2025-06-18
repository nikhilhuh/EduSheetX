import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppProvider";
import React from "react";
import { incrementSiteVisitors } from "./services/api/apiCalls/common/incrementSiteVisitors";

function App() {
  React.useEffect(() => {
    const alreadyCounted = localStorage.getItem("visitor-counted");
    if (!alreadyCounted) {
      incrementSiteVisitors().then(() => {
        localStorage.setItem("visitor-counted", "true");
      });
    }
  }, []);

  return (
    <div>
      <AppProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
