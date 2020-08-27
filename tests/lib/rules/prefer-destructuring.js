/**
 * @fileoverview Prefer destructuring from arrays and objects
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/prefer-destructuring"),
    { RuleTester } = require("../../../lib/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });

ruleTester.run("prefer-destructuring", rule, {
    valid: [
        "var [foo] = array;",
        "var { foo } = object;",
        "var foo;",
        {

            // Ensure that the default behavior does not require destructuring when renaming
            code: "var foo = object.bar;",
            options: [{ VariableDeclarator: { object: true } }]
        },
        {

            // Ensure that the default behavior does not require destructuring when renaming
            code: "var foo = object.bar;",
            options: [{ object: true }]
        },
        {
            code: "var foo = object.bar;",
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "var foo = object.bar;",
            options: [{ object: true }, { enforceForRenamedProperties: false }]
        },
        {
            code: "var foo = object['bar'];",
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "var foo = object[bar];",
            options: [{ object: true }, { enforceForRenamedProperties: false }]
        },
        {
            code: "var { bar: foo } = object;",
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: true }]
        },
        {
            code: "var { bar: foo } = object;",
            options: [{ object: true }, { enforceForRenamedProperties: true }]
        },
        {
            code: "var { [bar]: foo } = object;",
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: true }]
        },
        {
            code: "var { [bar]: foo } = object;",
            options: [{ object: true }, { enforceForRenamedProperties: true }]
        },
        {
            code: "var foo = array[0];",
            options: [{ VariableDeclarator: { array: false } }]
        },
        {
            code: "var foo = array[0];",
            options: [{ array: false }]
        },
        {
            code: "var foo = object.foo;",
            options: [{ VariableDeclarator: { object: false } }]
        },
        {
            code: "var foo = object['foo'];",
            options: [{ VariableDeclarator: { object: false } }]
        },
        "({ foo } = object);",
        {

            // Fix #8654
            code: "var foo = array[0];",
            options: [{ VariableDeclarator: { array: false } }, { enforceForRenamedProperties: true }]
        },
        {

            // Fix #8654
            code: "var foo = array[0];",
            options: [{ array: false }, { enforceForRenamedProperties: true }]
        },
        "[foo] = array;",
        "foo += array[0]",
        "foo += bar.foo",
        {
            code: "foo = object.foo;",
            options: [{ AssignmentExpression: { object: false } }, { enforceForRenamedProperties: true }]
        },
        {
            code: "foo = object.foo;",
            options: [{ AssignmentExpression: { object: false } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "foo = array[0];",
            options: [{ AssignmentExpression: { array: false } }, { enforceForRenamedProperties: true }]
        },
        {
            code: "foo = array[0];",
            options: [{ AssignmentExpression: { array: false } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "foo = array[0];",
            options: [{ VariableDeclarator: { array: true }, AssignmentExpression: { array: false } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "var foo = array[0];",
            options: [{ VariableDeclarator: { array: false }, AssignmentExpression: { array: true } }, { enforceForRenamedProperties: false }]
        },
        {
            code: "foo = object.foo;",
            options: [{ VariableDeclarator: { object: true }, AssignmentExpression: { object: false } }]
        },
        {
            code: "var foo = object.foo;",
            options: [{ VariableDeclarator: { object: false }, AssignmentExpression: { object: true } }]
        },
        "class Foo extends Bar { static foo() {var foo = super.foo} }",
        "foo = bar[foo];",
        "var foo = bar[foo];",
        {
            code: "var {foo: {bar}} = object;",
            options: [{ object: true }]
        },
        {
            code: "var {bar} = object.foo;",
            options: [{ object: true }]
        },

        // Optional chaining
        "var foo = array?.[0];", // because the fixed code can throw TypeError.
        "var foo = object?.foo;"
    ],

    invalid: [
        {
            code: "var foo = array[0];",
            output: null,
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "foo = array[0];",
            output: null,
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "var foo = object.foo;",
            output: "var {foo} = object;",
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foo = object.bar.foo;",
            output: "var {foo} = object.bar;",
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foobar = object.bar;",
            output: null,
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: true }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foobar = object.bar;",
            output: null,
            options: [{ object: true }, { enforceForRenamedProperties: true }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foo = object[bar];",
            output: null,
            options: [{ VariableDeclarator: { object: true } }, { enforceForRenamedProperties: true }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foo = object[bar];",
            output: null,
            options: [{ object: true }, { enforceForRenamedProperties: true }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foo = object['foo'];",
            output: null,
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "foo = object.foo;",
            output: null,
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "foo = object['foo'];",
            output: null,
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "var foo = array[0];",
            output: null,
            options: [{ VariableDeclarator: { array: true } }, { enforceForRenamedProperties: true }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "foo = array[0];",
            output: null,
            options: [{ AssignmentExpression: { array: true } }],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "var foo = array[0];",
            output: null,
            options: [
                {
                    VariableDeclarator: { array: true },
                    AssignmentExpression: { array: false }
                },
                { enforceForRenamedProperties: true }
            ],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "var foo = array[0];",
            output: null,
            options: [
                {
                    VariableDeclarator: { array: true },
                    AssignmentExpression: { array: false }
                }
            ],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "VariableDeclarator"
            }]
        },
        {
            code: "foo = array[0];",
            output: null,
            options: [
                {
                    VariableDeclarator: { array: false },
                    AssignmentExpression: { array: true }
                }
            ],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "array" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "foo = object.foo;",
            output: null,
            options: [
                {
                    VariableDeclarator: { array: true, object: false },
                    AssignmentExpression: { object: true }
                }
            ],
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "AssignmentExpression"
            }]
        },
        {
            code: "class Foo extends Bar { static foo() {var bar = super.foo.bar} }",
            output: "class Foo extends Bar { static foo() {var {bar} = super.foo} }",
            errors: [{
                messageId: "preferDestructuring",
                data: { type: "object" },
                type: "VariableDeclarator"
            }]
        }
    ]
});
