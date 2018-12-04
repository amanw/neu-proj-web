import PropTypes from "prop-types";
import React from "react";

import Sector from "../Sector";

var Circle = function Circle(_ref) {
  var center = _ref.center,
      color = _ref.color,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onTouchEnd = _ref.onTouchEnd,
      onTouchStart = _ref.onTouchStart,
      radius = _ref.radius,
      strokeColor = _ref.strokeColor,
      strokeWidth = _ref.strokeWidth,
      title = _ref.title;
  return React.createElement(
    "ellipse",
    {
      cx: center,
      cy: center,
      fill: color,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onTouchEnd: onTouchEnd,
      onTouchStart: onTouchStart,
      rx: radius,
      ry: radius,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    },
    title && React.createElement(
      "title",
      null,
      title
    )
  );
};

Circle.propTypes = process.env.NODE_ENV !== "production" ? {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  center: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  title: PropTypes.string
} : {};

Circle.defaultProps = {
  strokeColor: Sector.defaultProps.strokeColor,
  strokeWidth: Sector.defaultProps.strokeWidth
};

export default Circle;