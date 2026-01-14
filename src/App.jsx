import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import "./pages/media.css";
import Header from "./Components/common/Header/Header";
import Footer from "./Components/common/Footer/Footer";
import Home from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";
import TvPage from "./pages/TvPage";
import DetailsPage from "./pages/DetailsPage";
import SearchList from "./pages/SearchList";
import ConnectionError from "./pages/ConnectionError";
import NotFound from "./pages/NotFound";
import WatchList from "./pages/WatchList";

/* Layout WITH footer */
function MainLayout() {
  return (
    <div className="app_layout">
      <Header />
      <main className="app_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/* Layout WITHOUT footer */
function NoFooterLayout() {
  return (
    <div className="app_layout">
      <Header />
      <main className="app_content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Routes WITH footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/search/:q" element={<SearchList />} />
        <Route path="/:media_type/details/:id/:slug" element={<DetailsPage />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Route>

      {/* Routes WITHOUT footer */}
      <Route element={<NoFooterLayout />}>
        <Route path="/connection-error" element={<ConnectionError />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
