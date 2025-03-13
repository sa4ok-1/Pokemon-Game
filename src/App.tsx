import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FormContainer } from "./components/FormContainer";
import { Logo } from "./components/Logo";
import { SavedTeam } from "./components/SavedTeam";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 flex flex-col items-center justify-center relative">
        <Logo />
        <Link
          to="/saved-team"
          className="absolute top-[50px] right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Saved Team
        </Link>

        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/saved-team" element={<SavedTeam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
