import ToggleColormodel from "./components/ToggleColormodel";
import View from "./components/View";
import AuthProvider from "./components/context/authContext";

function App() {
  return (
    <AuthProvider>
      <ToggleColormodel />
        <View />
    </AuthProvider>
  );
}

export default App;
