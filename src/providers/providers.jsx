import { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

const Providers = ({ children }) => {
  return (
    <div>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Providers;
