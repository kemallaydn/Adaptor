import GlobalProvider from "./src/context/GlobalContext";
import { EditModal } from "./src/Instance/EditInstance";
import Navigator from "./src/navigation";

const App = () => {
  return (
    <GlobalProvider>
      <Navigator />
      <EditModal />
    </GlobalProvider>
  );
}

export default App;