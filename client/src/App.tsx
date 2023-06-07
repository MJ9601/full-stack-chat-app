import ToggleColormodel from "./components/ToggleColormodel";
import View from "./components/View";
import LogProvider from "./components/context/authContext";
import SocketProvider from "./components/context/socketContext";

function App() {
  return (
    <LogProvider>
      <ToggleColormodel />
      <SocketProvider>
        <View />
      </SocketProvider>
    </LogProvider>
  );
}

export default App;
