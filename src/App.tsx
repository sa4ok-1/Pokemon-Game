import { FormContainer } from "./components/FormContainer";
import { Logo } from "./components/Logo";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white p-6 flex items-center justify-center">
      <Logo />
      <FormContainer />
    </div>
  );
}

export default App;
