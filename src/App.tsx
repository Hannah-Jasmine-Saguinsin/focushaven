import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Environment from "./scenes/Environment";
import Focus from "./pages/Focus";

import "./App.css";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="placeholder-page">
      <h1>{title}</h1>
      <p>This workspace is currently in development.</p>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Environment />

        <div className="interface">
          <Navigation />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Focus />} />

              <Route
                path="/notes"
                element={<PlaceholderPage title="Notes" />}
              />

              <Route
                path="/tasks"
                element={<PlaceholderPage title="Tasks" />}
              />

              <Route
                path="/insights"
                element={<PlaceholderPage title="Insights" />}
              />

              <Route
                path="/studio"
                element={<PlaceholderPage title="Studio" />}
              />

              <Route
                path="/settings"
                element={<PlaceholderPage title="Settings" />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}