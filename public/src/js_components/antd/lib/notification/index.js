'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var notificationInstance = void 0;
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight';
function getPlacementStyle(placement) {
    var style = void 0;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        case 'bottomRight':
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        default:
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto'
            };
    }
    return style;
}
function getNotificationInstance(prefixCls) {
    if (notificationInstance) {
        return notificationInstance;
    }
    notificationInstance = _rcNotification2["default"].newInstance({
        prefixCls: prefixCls,
        className: prefixCls + '-' + defaultPlacement,
        style: getPlacementStyle(defaultPlacement)
    });
    return notificationInstance;
}
function notice(args) {
    var outerPrefixCls = args.prefixCls || 'ant-notification';
    var prefixCls = outerPrefixCls + '-notice';
    if (args.placement !== undefined) {
        defaultPlacement = args.placement;
        notificationInstance = null; // delete notificationInstance for new defaultPlacement
    }
    var duration = void 0;
    if (args.duration === undefined) {
        duration = defaultDuration;
    } else {
        duration = args.duration;
    }
    var iconType = '';
    switch (args.type) {
        case 'success':
            iconType = 'check-circle-o';
            break;
        case 'info':
            iconType = 'info-circle-o';
            break;
        case 'error':
            iconType = 'cross-circle-o';
            break;
        case 'warning':
            iconType = 'exclamation-circle-o';
            break;
        default:
            iconType = 'info-circle';
    }
    var iconNode = void 0;
    if (args.icon) {
        iconNode = _react2["default"].createElement(
            'span',
            { className: prefixCls + '-icon' },
            args.icon
        );
    } else if (args.type) {
        iconNode = _react2["default"].createElement(_icon2["default"], { className: prefixCls + '-icon ' + prefixCls + '-icon-' + args.type, type: iconType });
    }
    getNotificationInstance(outerPrefixCls).notice({
        content: _react2["default"].createElement(
            'div',
            { className: iconNode ? prefixCls + '-with-icon' : '' },
            iconNode,
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-message' },
                args.message
            ),
            _react2["default"].createElement(
                'div',
                { className: prefixCls + '-description' },
                args.description
            ),
            args.btn ? _react2["default"].createElement(
                'span',
                { className: prefixCls + '-btn' },
                args.btn
            ) : null
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
    });
}
var api = {
    open: function open(args) {
        notice(args);
    },
    close: function close(key) {
        if (notificationInstance) {
            notificationInstance.removeNotice(key);
        }
    },
    config: function config(options) {
        var duration = options.duration,
            placement = options.placement,
            bottom = options.bottom,
            top = options.top;

        if (placement !== undefined) {
            defaultPlacement = placement;
        }
        if (bottom !== undefined) {
            defaultBottom = bottom;
        }
        if (top !== undefined) {
            defaultTop = top;
        }
        // delete notificationInstance
        if (placement !== undefined || bottom !== undefined || top !== undefined) {
            notificationInstance = null;
        }
        if (duration !== undefined) {
            defaultDuration = duration;
        }
    },
    destroy: function destroy() {
        if (notificationInstance) {
            notificationInstance.destroy();
            notificationInstance = null;
        }
    }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
    api[type] = function (args) {
        return api.open((0, _objectAssign2["default"])({}, args, { type: type }));
    };
});
api.warn = api.warning;
exports["default"] = api;
module.exports = exports['default'];