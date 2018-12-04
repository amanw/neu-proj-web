"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Sector = require("../Sector");

var _Sector2 = _interopRequireDefault(_Sector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react2.default.createElement(
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
    title && _react2.default.createElement(
      "title",
      null,
      title
    )
  );
};

Circle.propTypes = process.env.NODE_ENV !== "production" ? {
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  center: _propTypes2.default.number.isRequired,
  color: _propTypes2.default.string.isRequired,
  radius: _propTypes2.default.number.isRequired,
  strokeColor: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  title: _propTypes2.default.string
} : {};

Circle.defaultProps = {
  strokeColor: _Sector2.default.defaultProps.strokeColor,
  strokeWidth: _Sector2.default.defaultProps.strokeWidth
};

exports.default = Circle;
module.exports = exports["default"];