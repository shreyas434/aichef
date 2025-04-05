
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-dark">
      <div className="glass-card p-8 rounded-lg text-center max-w-md animate-float">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-muted/20 text-neon-blue">
            <AlertTriangle className="w-12 h-12 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-space-light/80 mb-6">
          This cosmic destination doesn't exist
        </p>
        <Button asChild className="bg-neon-gradient hover:opacity-90 transition-opacity">
          <a href="/">Return to AstroChef</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
