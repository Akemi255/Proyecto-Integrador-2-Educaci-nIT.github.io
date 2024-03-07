import Providers from "./providers/providers.jsx";
import AppRouter from "./router/router.jsx";
import "./styles/App.scss";
import { CartProvider } from "./context/CartContext.jsx";

function App() {

  return (
    <Providers>
        <CartProvider>
        <AppRouter />
        </CartProvider>
    </Providers>
  );
}

export default App;
