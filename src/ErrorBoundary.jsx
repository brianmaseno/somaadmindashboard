import PropTypes from "prop-types";

const ErrorBoundary = ({ children }) => {
  return <>{children}</>;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
