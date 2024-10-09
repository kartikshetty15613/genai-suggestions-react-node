import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostIdea from "./pages/PostIdea";
import RateIdea from "./pages/RateIdea";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="ideas/post" element={<PostIdea />} />
          <Route path="ideas/:ideaId/rate" element={<RateIdea />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
