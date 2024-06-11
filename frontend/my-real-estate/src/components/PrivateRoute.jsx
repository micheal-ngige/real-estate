import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Element, auth, ...rest }) => {
  return auth.isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
