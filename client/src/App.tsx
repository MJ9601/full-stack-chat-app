import ToggleColormodel from "./components/ToggleColormodel";
import View from "./components/View";
import LogProvider from "./components/context/authContext";

function App() {
  return (
    <LogProvider>
      <ToggleColormodel />
      <View />
    </LogProvider>
  );
}

export default App;
