import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import MainPage from "./components/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/tasks" />} />
        <Route
          path="/tasks"
          element={
            <div>
              <ErrorBoundary>
                <MainPage />
              </ErrorBoundary>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
