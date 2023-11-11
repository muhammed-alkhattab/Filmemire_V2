import React from "react";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies/Movies";
import { Routes, Route } from "react-router-dom";
//import Actors from './components/actor/Actor';
//import MoviePage from './components/NewIdea/Info';
//import Profile from './components/Profile/Profile';
import { Suspense } from "react";
const LazyInfo = React.lazy(() => import("./components/NewIdea/Info"));
const LazyAztor = React.lazy(() => import("./components/actor/Actor"));
const LazyProfile = React.lazy(() => import("./components/Profile/Profile"));

function App() {
  return (
    <>
    
    
    
    <div className="App" style={{ display: "flex", height: "100dvh" }}>
    <CssBaseline/>
    <NavBar />
      
      
      <div style={{ flexGrow: 1, width: "100%", marginTop: "4rem" }}>
        <Routes>
          <Route index path="/" element={<Movies />} />

          <Route path="/filmpire/approved" element={<Movies />} />
          <Route
            path="/movie/:id"
            element={
              <Suspense fallback={<div>loadding ....</div>}>
                <LazyInfo />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<div>loadding ....</div>}>
                <LazyProfile />
              </Suspense>
            }
          />
          <Route
            path="/actor/:id"
            element={
              <Suspense fallback={<div>loadding ....</div>}>
                <LazyAztor />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default App;
