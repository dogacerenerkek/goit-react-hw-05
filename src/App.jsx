 import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("./Pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("./Components/MovieCast/MoviecCast.jsx"));
const MovieReviews = lazy(() => import("./Components/MovieReviews/MovieReviews"));


const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
       </Routes>
      </Suspense>
    </>
  );
};

export default App;