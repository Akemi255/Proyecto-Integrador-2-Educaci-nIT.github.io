import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button } from "@mui/material";

import "../../styles/scss/header/header.scss";
import { useSelectedOption } from "../../context/SelectedOptionContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { selectedOption, setSelectedOption } = useSelectedOption();
  const { cartNumber } = useCart();

  return (
    <header className="header-container">
      <div className="header-content">
        <nav>
          <ul className="header-nav">
            <Button
              component={Link}
              to="/"
              onClick={() => setSelectedOption("Inicio")}
              style={{
                backgroundColor: selectedOption === "Inicio" ? "#e6e6e6" : "",
              }}
            >
              Inicio
            </Button>
            <Button
              component={Link}
              to="/about"
              onClick={() => setSelectedOption("Sobre Nosotros")}
              style={{
                backgroundColor:
                  selectedOption === "Sobre Nosotros" ? "#e6e6e6" : "",
              }}
            >
              Nosotros
            </Button>
            <Button
              component={Link}
              to="/contact"
              onClick={() => setSelectedOption("Contacto")}
              style={{
                backgroundColor: selectedOption === "Contacto" ? "#e6e6e6" : "",
              }}
            >
              Contacto
            </Button>
          </ul>
        </nav>
        <Link
          className="logo-container"
          onClick={() => setSelectedOption("Inicio")}
          to="/"
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "175px", height: "65px" }}
          />
        </Link>
        <Badge
          badgeContent={cartNumber}
          color="secondary"
          component={Link}
          to="/cart"
        >
          <ShoppingCartIcon
            sx={{ fontSize: 32 }}
            onClick={() => setSelectedOption(null)}
          />
        </Badge>
      </div>
    </header>
  );
};

export default Header;
