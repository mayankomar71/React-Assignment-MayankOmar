import { ListView } from "./features/List/listView";
import { useEffect } from "react";
import { UserDetails } from "./features/UserDetails/userDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/users";
    }
  }, [window.location.pathname]);

  return (
    <Router>
      <Routes>
        <Route path="/user/detail/:id" element={<UserDetails />} />
        <Route path="/users" element={<ListView />} />
      </Routes>
    </Router>
  );
}

export default App;
