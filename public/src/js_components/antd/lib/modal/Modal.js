'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mousePosition = void 0;
var mousePositionEventBinded = void 0;

var Modal = function (_React$Component) {
    (0, _inherits3["default"])(Modal, _React$Component);

    function Modal() {
        (0, _classCallCheck3["default"])(this, Modal);

        var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));

        _this.handleCancel = function (e) {
            var onCancel = _this.props.onCancel;
            if (onCancel) {
                onCancel(e);
            }
        };
        _this.handleOk = function (e) {
            var onOk = _this.props.onOk;
            if (onOk) {
                onOk(e);
            }
        };
        return _this;
    }

    Modal.prototype.componentDidMount = function componentDidMount() {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        (0, _addEventListener2["default"])(document.documentElement, 'click', function (e) {
            mousePosition = {
                x: e.pageX,
                y: e.pageY
            };
            // 100ms 内发生过点击事件，则从点击位置动画展示
            // 否则直接 zoom 展示
            // 这样可以兼容非点击方式展开
            setTimeout(function () {
                return mousePosition = null;
            }, 100);
        });
        mousePositionEventBinded = true;
    };

    Modal.prototype.render = function render() {
        var _props = this.props,
            okText = _props.okText,
            cancelText = _props.cancelText,
            confirmLoading = _props.confirmLoading,
            footer = _props.footer,
            visible = _props.visible;

        if (this.context.antLocale && this.context.antLocale.Modal) {
            okText = okText || this.context.antLocale.Modal.okText;
            cancelText = cancelText || this.context.antLocale.Modal.cancelText;
        }
        var defaultFooter = [_react2["default"].createElement(
            _button2["default"],
            { key: 'cancel', size: 'large', onClick: this.handleCancel },
            cancelText || '取消'
        ), _react2["default"].createElement(
            _button2["default"],
            { key: 'confirm', type: 'primary', size: 'large', loading: confirmLoading, onClick: this.handleOk },
            okText || '确定'
        )];
        return _react2["default"].createElement(_rcDialog2["default"], (0, _extends3["default"])({ onClose: this.handleCancel, footer: footer || defaultFooter }, this.props, { visible: visible, mousePosition: mousePosition }));
    };

    return Modal;
}(_react2["default"].Component);

exports["default"] = Modal;

Modal.defaultProps = {
    prefixCls: 'ant-modal',
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false
};
Modal.propTypes = {
    prefixCls: _react.PropTypes.string,
    onOk: _react.PropTypes.func,
    onCancel: _react.PropTypes.func,
    okText: _react.PropTypes.node,
    cancelText: _react.PropTypes.node,
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    confirmLoading: _react.PropTypes.bool,
    visible: _react.PropTypes.bool,
    align: _react.PropTypes.object,
    footer: _react.PropTypes.node,
    title: _react.PropTypes.node,
    closable: _react.PropTypes.bool
};
Modal.contextTypes = {
    antLocale: _react2["default"].PropTypes.object
};
module.exports = exports['default'];