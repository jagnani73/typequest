import { HomeScreen } from "./components/home";
import { Footer } from "./components/shared";
import { BlockSettingsProvider } from "./utils/store";

const App: React.FC = () => {
  return (
    <BlockSettingsProvider>
      <HomeScreen />
      {/* <Footer /> */}
    </BlockSettingsProvider>
  );
};

export default App;
