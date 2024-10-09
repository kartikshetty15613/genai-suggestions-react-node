import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostIdea from "./pages/PostIdea";
import RateIdea from "./pages/RateIdea";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Ideas from "./pages/Ideas";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="idea" element={<PostIdea />} />
          <Route path="ideas/rate" element={<RateIdea />} />
          <Route path="ideas/list" element={<Ideas />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
