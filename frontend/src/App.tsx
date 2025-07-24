import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppProvider";
import { incrementSiteVisitors } from "./services/api/apiCalls/common/incrementSiteVisitors";
import PageLoader from "./components/Loaders/PageLoader";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(true);

  // AOS + Visitor Tracking
  useEffect(() => {
    AOS.init({ once: true, duration: 1200 });

    const alreadyCounted = localStorage.getItem("visitor-counted");
    if (!alreadyCounted) {
      incrementSiteVisitors()
        .then(() => localStorage.setItem("visitor-counted", "true"))
        .catch((err) => console.error("Visitor count failed:", err));
    }
  }, []);

  // Handle Full Page Load (images/fonts)
  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Optional: remove fixed delay
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
