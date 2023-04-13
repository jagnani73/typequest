import { HomeScreen } from "./components/home";
import { Topbar } from "./components/shared";
import { TypequestProvider } from "./lib";
import { BlockSettingsProvider } from "./utils/store";

const App: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Topbar />

      <TypequestProvider>
        <BlockSettingsProvider>
          <HomeScreen />
        </BlockSettingsProvider>
      </TypequestProvider>
    </div>
  );
};

export default App;
