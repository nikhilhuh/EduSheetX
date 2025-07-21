import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppProvider";
import { incrementSiteVisitors } from "./services/api/apiCalls/common/incrementSiteVisitors";
import PageLoader from "./components/Loaders/PageLoader";

function App() {
  const [loading, setLoading] = useState(true);

  // Visitor counter logic
  useEffect(() => {
    const alreadyCounted = localStorage.getItem("visitor-counted");
    if (!alreadyCounted) {
      incrementSiteVisitors().then(() => {
        localStorage.setItem("visitor-counted", "true");
      });
    }
  }, []);

  const handleLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Wait for full page load (images, fonts, etc.)
  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (loading) return <PageLoader />;

  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
