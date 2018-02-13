/*
  Copyright (c) 2018 Dmitry Turovtsov
  Licensed under the MIT License (MIT), see
  https://github.com/webbestmaster/rcn
*/

/* global define */

(function () {
    'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Rcn = function () {
        function Rcn(classList) {
            _classCallCheck(this, Rcn);

            this.className = classList.join(' ');
        }

        _createClass(Rcn, [{
            key: 'toString',
            value: function toString() {
                return this.className;
            }
        }]);

        return Rcn;
    }();

    function pushClass(result, candidate) {
        // eslint-disable-line complexity
        if (!candidate) {
            return result;
        }

        var candidateType = typeof candidate === 'undefined' ? 'undefined' : _typeof(candidate);

        if (Array.isArray(candidate)) {
            return pushClassArray(result, candidate);
        }

        if (candidateType === 'object') {
            return pushClassObject(result, candidate);
        }

        if (candidateType === 'string' || candidateType === 'number') {
            return pushClassString(result, candidate);
        }

        return result;
    }

    function pushClassObject(result, object) {
        for (var key in object) {
            if (object.hasOwnProperty(key) && object[key]) {
                result.push(key);
            }
        }

        return result;
    }

    function pushClassString(result, string) {
        result.push(string);
        return result;
    }

    function pushClassArray(result, array) {
        var ii = 0;
        var length = array.length;


        for (; ii < length; ii += 1) {
            pushClass(result, array[ii]);
        }

        return result;
    }

    function rcn() {
        var result = [];
        var length = arguments.length;

        var ii = 0;

        for (; ii < length; ii += 1) {
            pushClass(result, arguments[ii]);
        }

        return new Rcn(result);
    }

    if (typeof module !== 'undefined' && module.exports) {
        rcn.default = rcn;
        module.exports = rcn;
    } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        // register as 'rcn', consistent with npm package name
        define('rcn', [], function () {
            return rcn;
        });
    } else {
        window.rcn = rcn;
    }
}());
