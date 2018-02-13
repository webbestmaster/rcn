/*!
  Copyright (c) 2018 Dmitry Turovtsov
  Licensed under the MIT License (MIT), see
  https://github.com/webbestmaster/rcn
*/

/* global define */

(function () {
    'use strict';

    // you code is here

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
