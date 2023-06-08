import ToggleColormodel from "./components/ToggleColormodel";
import View from "./components/View";
import AuthProvider from "./components/context/authContext";
import SocketProvider from "./components/context/socketContext";

function App() {
  return (
    <AuthProvider>
      <ToggleColormodel />
      <SocketProvider>
        <View />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
