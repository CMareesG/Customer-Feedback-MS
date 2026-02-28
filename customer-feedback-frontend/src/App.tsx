import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

/**
 * Root App Component
 * Only responsible for initializing Router
 * All routes are handled in AppRoutes.tsx
 */

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;