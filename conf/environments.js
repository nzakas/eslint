/**
 * @fileoverview Defines environment settings and globals.
 * @author Elan Shanker
 * @copyright 2014 Elan Shanker. All rights reserved.
 */
"use strict";

var globals = require("globals");

module.exports = {
    builtin: globals.builtin,
    browser: {
        globals: globals.browser
    },
    node: {
        globals: globals.node,
        rules: {
            "no-catch-shadow": 0,
            "no-console": 0,
            "no-mixed-requires": 2,
            "no-new-require": 2,
            "no-path-concat": 2,
            "no-process-exit": 2,
            "global-strict": [0, "always"],
            "handle-callback-err": [2, "err"]
        }
    },
    amd: {
        globals: globals.amd
    },
    mocha: {
        globals: globals.mocha
    },
    jasmine: {
        globals: globals.jasmine
    },
    phantom: {
        globals: globals.phantom
    },
    mootools: {
        globals: globals.mootools
    },
    couch: {
        globals: globals.couch
    },
    jquery: {
        globals: globals.jquery
    },
    qunit: {
        globals: globals.qunit
    },
    rhino: {
        globals: globals.rhino
    },
    shelljs: {
        globals: globals.shelljs
    },
    prototypejs: {
        globals: globals.prototypejs
    },
    yui: {
        globals: globals.yui
    },
    wsh: {
        globals: globals.wsh
    },
    worker: {
        globals: globals.worker
    },
    nonstandard: {
        globals: globals.nonstandard
    },
    browserify: {
        globals: globals.browserify
    },
    devel: {
        globals: globals.devel
    },
    dojo: {
        globals: globals.devel
    },
    typed: {
        globals: globals.devel
    }

};
