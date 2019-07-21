/**
 * @fileoverview Tests for prefer-async-await rule.
 * @author Elad Shahar
 * @author Alexander Lichter
 */

"use strict";

const rule = require("../../../lib/rules/prefer-async-await");
const { RuleTester } = require("../../../lib/rule-tester");

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2017 } });

ruleTester.run("prefer-async-await", rule, {
    valid: [
        "async function a() { await getData(); }",
        "async function hi() { await thing() }",
        "async function hi() { await thing().catch() }",
        "a = async () => (await something())",
        "doSomething(foo.then)"
    ],
    invalid: [
        { code: "getData().then(() => {});", errors: [{ messageId: "preferAsyncAwait" }] },
        {
            code: "function foo() { hey.then(x => {}) }",
            errors: [{ messageId: "preferAsyncAwait" }]
        },
        {
            code: "function foo() { hey.then(function() { }).then() }",
            errors: [{ messageId: "preferAsyncAwait" }, { messageId: "preferAsyncAwait" }]
        },
        {
            code: "function foo() { hey.then(function() { }).then(x).catch() }",
            errors: [{ messageId: "preferAsyncAwait" }, { messageId: "preferAsyncAwait" }]
        },
        {
            code: "async function a() { hey.then(function() { }).then(function() { }) }",
            errors: [{ messageId: "preferAsyncAwait" }, { messageId: "preferAsyncAwait" }]
        }
    ]
});
