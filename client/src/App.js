import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Category from "./Component/Category";
import Feedback from "./Component/Feedback";
import Graphs from "./Component/Graphs";
import { useState } from "react";

function App() {
  const [CheckedItems, setCheckedItems] = useState([]);

  const recieveCheckedItems = (data) => {
    setCheckedItems(data);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route
          path="/categories"
          element={<Category recieveCheckedItems={recieveCheckedItems} />}
        />
        <Route
          path="/feedback"
          element={<Feedback CheckedItems={CheckedItems} />}
        />
        <Route path="/graph" element={<Graphs />} />
      </Routes>
    </div>
  );
}

export default App;
