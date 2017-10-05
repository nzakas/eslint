/**
 * @fileoverview Tests for array-bracket-newline rule.
 * @author Jan Peer Stöcklmair <https://github.com/JPeer264>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/array-bracket-newline");
const RuleTester = require("../../../lib/testers/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const ERR_NO_BREAK_AFTER = "There should be no linebreak after '['.";
const ERR_BREAK_AFTER = "A linebreak is required after '['.";
const ERR_NO_BREAK_BEFORE = "There should be no linebreak before ']'.";
const ERR_BREAK_BEFORE = "A linebreak is required before ']'.";

ruleTester.run("array-bracket-newline", rule, {

    valid: [

        // ArrayExpression
        // "default" { multiline: true }
        "var foo = [];",
        "var foo = [1];",
        "var foo = /* any comment */[1];",
        "var foo = /* any comment */\n[1];",
        "var foo = [1, 2];",
        "var foo = [ // any comment\n1, 2\n];",
        "var foo = [\n// any comment\n1, 2\n];",
        "var foo = [\n1, 2\n// any comment\n];",
        "var foo = [\n1,\n2\n];",
        "var foo = [\nfunction foo() {\nreturn dosomething();\n}\n];",

        // "always"
        { code: "var foo = [\n];", options: ["always"] },
        { code: "var foo = [\n1\n];", options: ["always"] },
        { code: "var foo = [\n// any\n1\n];", options: ["always"] },
        { code: "var foo = [\n/* any */\n1\n];", options: ["always"] },
        { code: "var foo = [\n1, 2\n];", options: ["always"] },
        { code: "var foo = [\n1, 2 // any comment\n];", options: ["always"] },
        { code: "var foo = [\n1, 2 /* any comment */\n];", options: ["always"] },
        { code: "var foo = [\n1,\n2\n];", options: ["always"] },
        { code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];", options: ["always"] },

        // "never"
        { code: "var foo = [];", options: ["never"] },
        { code: "var foo = [1];", options: ["never"] },
        { code: "var foo = [/* any comment */1];", options: ["never"] },
        { code: "var foo = [1, 2];", options: ["never"] },
        { code: "var foo = [1,\n2];", options: ["never"] },
        { code: "var foo = [1,\n/* any comment */\n2];", options: ["never"] },
        { code: "var foo = [function foo() {\ndosomething();\n}];", options: ["never"] },

        // { multiline: true }
        { code: "var foo = [];", options: [{ multiline: true }] },
        { code: "var foo = [1];", options: [{ multiline: true }] },
        { code: "var foo = /* any comment */[1];", options: [{ multiline: true }] },
        { code: "var foo = /* any comment */\n[1];", options: [{ multiline: true }] },
        { code: "var foo = [1, 2];", options: [{ multiline: true }] },
        { code: "var foo = [ // any comment\n1, 2\n];", options: [{ multiline: true }] },
        { code: "var foo = [\n// any comment\n1, 2\n];", options: [{ multiline: true }] },
        { code: "var foo = [\n1, 2\n// any comment\n];", options: [{ multiline: true }] },
        { code: "var foo = [\n1,\n2\n];", options: [{ multiline: true }] },
        { code: "var foo = [\nfunction foo() {\nreturn dosomething();\n}\n];", options: [{ multiline: true }] },

        // { multiline: false }
        { code: "var foo = [];", options: [{ multiline: false }] },
        { code: "var foo = [1];", options: [{ multiline: false }] },
        { code: "var foo = [1]/* any comment*/;", options: [{ multiline: false }] },
        { code: "var foo = [1]\n/* any comment*/\n;", options: [{ multiline: false }] },
        { code: "var foo = [1, 2];", options: [{ multiline: false }] },
        { code: "var foo = [1,\n2];", options: [{ multiline: false }] },
        { code: "var foo = [function foo() {\nreturn dosomething();\n}];", options: [{ multiline: false }] },

        // { minItems: 2 }
        { code: "var foo = [];", options: [{ minItems: 2 }] },
        { code: "var foo = [1];", options: [{ minItems: 2 }] },
        { code: "var foo = [\n1, 2\n];", options: [{ minItems: 2 }] },
        { code: "var foo = [\n1,\n2\n];", options: [{ minItems: 2 }] },
        { code: "var foo = [function foo() {\ndosomething();\n}];", options: [{ minItems: 2 }] },

        // { minItems: 0 }
        { code: "var foo = [\n];", options: [{ minItems: 0 }] },
        { code: "var foo = [\n1\n];", options: [{ minItems: 0 }] },
        { code: "var foo = [\n1, 2\n];", options: [{ minItems: 0 }] },
        { code: "var foo = [\n1,\n2\n];", options: [{ minItems: 0 }] },
        { code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];", options: [{ minItems: 0 }] },

        // { minItems: null }
        { code: "var foo = [];", options: [{ minItems: null }] },
        { code: "var foo = [1];", options: [{ minItems: null }] },
        { code: "var foo = [1, 2];", options: [{ minItems: null }] },
        { code: "var foo = [1,\n2];", options: [{ minItems: null }] },
        { code: "var foo = [function foo() {\ndosomething();\n}];", options: [{ minItems: null }] },

        // { multiline: true, minItems: null }
        { code: "var foo = [];", options: [{ multiline: true, minItems: null }] },
        { code: "var foo = [1];", options: [{ multiline: true, minItems: null }] },
        { code: "var foo = [1, 2];", options: [{ multiline: true, minItems: null }] },
        { code: "var foo = [\n1,\n2\n];", options: [{ multiline: true, minItems: null }] },
        { code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];", options: [{ multiline: true, minItems: null }] },

        // { multiline: true, minItems: 2 }
        { code: "var a = [];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var b = [1];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var b = [ // any comment\n1\n];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var b = [ /* any comment */ 1];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var c = [\n1, 2\n];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var c = [\n/* any comment */1, 2\n];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var c = [\n1, /* any comment */ 2\n];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var d = [\n1,\n2\n];", options: [{ multiline: true, minItems: 2 }] },
        { code: "var e = [\nfunction foo() {\ndosomething();\n}\n];", options: [{ multiline: true, minItems: 2 }] },

        // ArrayPattern
        // default { multiline: true }
        { code: "var [] = foo", parserOptions: { ecmaVersion: 6 } },
        { code: "var [a] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var /* any comment */[a] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var /* any comment */\n[a] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var [a, b] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var [ // any comment\na, b\n] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var [\n// any comment\na, b\n] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na, b\n// any comment\n] = foo;", parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na,\nb\n] = foo;", parserOptions: { ecmaVersion: 6 } },

        // "always"
        { code: "var [\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\n// any\na\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\n/* any */\na\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na, b\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na, b // any comment\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na, b /* any comment */\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na,\nb\n] = foo;", options: ["always"], parserOptions: { ecmaVersion: 6 } },

        // { multiline: true }
        { code: "var [] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [a] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var /* any comment */[a] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var /* any comment */\n[a] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [a, b] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [ // any comment\na, b\n] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\n// any comment\na, b\n] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na, b\n// any comment\n] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },
        { code: "var [\na,\nb\n] = foo;", options: [{ multiline: true }], parserOptions: { ecmaVersion: 6 } },

        // { consistent: true }
        {
            code: [
                "var b = [",
                "    1",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }]
        },
        {
            code: [
                "var c = [1, 2];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }]
        },
        {
            code: [
                "var c = [",
                "    1,",
                "    2",
                "];"
            ].join("\n"),

            options: [{ multiline: true, consistent: true }]
        },
        {
            code: [
                "var e = [function() { dosomething();}];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }]
        },
        {
            code: [
                "var e = [",
                "    function() { dosomething();}",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }]
        },
        {
            code: [
                "let [] = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [a] = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [",
                "] = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [",
                "    a",
                "] = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [a, b] = [1, 2];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [",
                "    a, b",
                "] = [1, 2];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [k = function() {dosomething();}] = arr;"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [",
                "    k = function() {",
                "        dosomething();",
                "    }",
                "] = arr;"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "var c = [1,",
                "2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }]
        },
        {
            code: [
                "let [a,",
                "b] = [1, 2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }],
            parserOptions: { ecmaVersion: 6 }
        },

        // "consistent" and "minItems"
        {
            code: [
                "var c = [ 1 ];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }]
        },
        {
            code: [
                "var c = [",
                "1",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }]
        },
        {
            code: [
                "let [a] = [",
                "1",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }],
            parserOptions: { ecmaVersion: 6 }
        },
        {
            code: [
                "let [",
                "a",
                "] = [",
                "1",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }],
            parserOptions: { ecmaVersion: 6 }
        },
    ],

    invalid: [

        // ArrayExpression
        // "always"
        {
            code: "var foo = [];",
            output: "var foo = [\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11,
                    endLine: 1,
                    endColumn: 12
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 12,
                    endLine: 1,
                    endColumn: 13
                }
            ]
        },
        {
            code: "var foo = [1];",
            output: "var foo = [\n1\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "var foo = [ // any comment\n1];",
            output: "var foo = [ // any comment\n1\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2,
                    endLine: 2,
                    endColumn: 3
                }
            ]
        },
        {
            code: "var foo = [ /* any comment */\n1];",
            output: "var foo = [ /* any comment */\n1\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [1, 2];",
            output: "var foo = [\n1, 2\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11,
                    endLine: 1,
                    endColumn: 12
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 17
                }
            ]
        },
        {
            code: "var foo = [1, 2 // any comment\n];",
            output: "var foo = [\n1, 2 // any comment\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            code: "var foo = [1, 2 /* any comment */];",
            output: "var foo = [\n1, 2 /* any comment */\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 34
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [function foo() {\ndosomething();\n}];",
            output: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 2
                }
            ]
        },

        // "never"
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11,
                    endLine: 1,
                    endColumn: 12
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1,
                    endLine: 3,
                    endColumn: 2
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [ /* any comment */\n1, 2\n];",
            output: "var foo = [ /* any comment */\n1, 2];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1, 2\n/* any comment */];",
            output: "var foo = [1, 2\n/* any comment */];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 18
                }
            ]
        },
        {
            code: "var foo = [ // any comment\n1, 2\n];",
            output: "var foo = [ // any comment\n1, 2];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1,\n2\n];",
            output: "var foo = [1,\n2];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            output: "var foo = [function foo() {\ndosomething();\n}];",
            options: ["never"],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 5,
                    column: 1
                }
            ]
        },

        // { multiline: true }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n// any comment\n];",
            output: null,
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1, 2\n];",
            output: "var foo = [1, 2];",
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [function foo() {\ndosomething();\n}];",
            output: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            options: [{ multiline: true }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 2
                }
            ]
        },

        // { consistent: true }
        {
            code: [
                "var b = [1",
                "];"
            ].join("\n"),
            output: [
                "var b = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 2, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },        
        {
            code: [
                "var b = [",
                "1];"
            ].join("\n"),
            output: [
                "var b = [1];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 1, column: 9, message:ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "var c = [1, 2",
                "];"
            ].join("\n"),
            output: [
                "var c = [1, 2];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 2, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "var c = [",
                "1, 2];"
            ].join("\n"),
            output: [
                "var c = [1, 2];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 1, column: 9, message: ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "var c = [1,",
                "2];"
            ].join("\n"),
            output: [
                "var c = [",
                "1,",
                "2",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 1, column: 9, message: ERR_BREAK_AFTER },
                { line: 2, column: 2, message: ERR_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "var e = [function() {",
                "dosomething();",
                "}];"
            ].join("\n"),
            output: [
                "var e = [",
                "function() {",
                "dosomething();",
                "}",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            errors: [
                { line: 1, column: 9, message: ERR_BREAK_AFTER },
                { line: 3, column: 2, message: ERR_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [a",
                "] = [1]"
            ].join("\n"),
            output: [
                "let [a] = [1]"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 2, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [",
                "a] = [1]"
            ].join("\n"),
            output: [
                "let [a] = [1]"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "let [a, b",
                "] = [1, 2]"
            ].join("\n"),
            output: [
                "let [a, b] = [1, 2]"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 2, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [",
                "a, b] = [1, 2]"
            ].join("\n"),
            output: [
                "let [a, b] = [1, 2]"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "let [a,",
                "b] = [1, 2]"
            ].join("\n"),
            output: [
                "let [",
                "a,",
                "b",
                "] = [1, 2]"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_BREAK_AFTER },
                { line: 2, column: 2, message: ERR_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [e = function() {",
                "dosomething();",
                "}] = a;"
            ].join("\n"),
            output: [
                "let [",
                "e = function() {",
                "dosomething();",
                "}",
                "] = a;"
            ].join("\n"),
            options: [{ multiline: true, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_BREAK_AFTER },
                { line: 3, column: 2, message: ERR_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "var c = [",
                "1,",
                "2];"
            ].join("\n"),
            output: [
                "var c = [1,",
                "2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }],
            errors: [
                { line: 1, column: 9, message: ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "var c = [1,",
                "2",
                "];"
            ].join("\n"),
            output: [
                "var c = [1,",
                "2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }],
            errors: [
                { line: 3, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [",
                "a,",
                "b] = [1, 2];"
            ].join("\n"),
            output: [
                "let [a,",
                "b] = [1, 2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_NO_BREAK_AFTER }
            ]
        },
        {
            code: [
                "let [a,",
                "b",
                "] = [1, 2];"
            ].join("\n"),
            output: [
                "let [a,",
                "b] = [1, 2];"
            ].join("\n"),
            options: [{ multiline: false, consistent: true }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 3, column: 1, message: ERR_NO_BREAK_BEFORE }
            ]
        },

        // "consistent" and "minItems"
        {
            code: [
                "var c = [1, 2];"
            ].join("\n"),
            output: [
                "var c = [",
                "1, 2",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }],
            errors: [
                { line: 1, column: 9, message: ERR_BREAK_AFTER },
                { line: 1, column: 14, message: ERR_BREAK_BEFORE }
            ]
        },
        {
            code: [
                "let [a, b] = [",
                "1, 2",
                "];"
            ].join("\n"),
            output: [
                "let [",
                "a, b",
                "] = [",
                "1, 2",
                "];"
            ].join("\n"),
            options: [{ multiline: true, consistent: true, minItems: 2 }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                { line: 1, column: 5, message: ERR_BREAK_AFTER },
                { line: 1, column: 10, message: ERR_BREAK_BEFORE }
            ]
        },

        // { minItems: 2 }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ minItems: 2 }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ minItems: 2 }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [1, 2];",
            output: "var foo = [\n1, 2\n];",
            options: [{ minItems: 2 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: [{ minItems: 2 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            output: "var foo = [function foo() {\ndosomething();\n}];",
            options: [{ minItems: 2 }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 5,
                    column: 1
                }
            ]
        },

        // { minItems: 0 }
        {
            code: "var foo = [];",
            output: "var foo = [\n];",
            options: [{ minItems: 0 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 12
                }
            ]
        },
        {
            code: "var foo = [1];",
            output: "var foo = [\n1\n];",
            options: [{ minItems: 0 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            code: "var foo = [1, 2];",
            output: "var foo = [\n1, 2\n];",
            options: [{ minItems: 0 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: [{ minItems: 0 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }

            ]
        },
        {
            code: "var foo = [function foo() {\ndosomething();\n}];",
            output: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            options: [{ minItems: 0 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 2
                }
            ]
        },

        // { minItems: null }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1, 2\n];",
            output: "var foo = [1, 2];",
            options: [{ minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1,\n2\n];",
            output: "var foo = [1,\n2];",
            options: [{ minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            output: "var foo = [function foo() {\ndosomething();\n}];",
            options: [{ minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 5,
                    column: 1
                }
            ]
        },

        // { multiline: true, minItems: null }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ multiline: true, minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ multiline: true, minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1, 2\n];",
            output: "var foo = [1, 2];",
            options: [{ multiline: true, minItems: null }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: [{ multiline: true, minItems: null }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [function foo() {\ndosomething();\n}];",
            output: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            options: [{ multiline: true, minItems: null }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 2
                }
            ]
        },

        // { multiline: true, minItems: 2 }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ multiline: true, minItems: 2 }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ multiline: true, minItems: 2 }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [1, 2];",
            output: "var foo = [\n1, 2\n];",
            options: [{ multiline: true, minItems: 2 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 16
                }
            ]
        },
        {
            code: "var foo = [1,\n2];",
            output: "var foo = [\n1,\n2\n];",
            options: [{ multiline: true, minItems: 2 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var foo = [function foo() {\ndosomething();\n}];",
            output: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            options: [{ multiline: true, minItems: 2 }],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 2
                }
            ]
        },

        // extra test cases
        // "always"
        {
            code: "var foo = [\n1, 2];",
            output: "var foo = [\n1, 2\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 5
                }
            ]
        },
        {
            code: "var foo = [\t1, 2];",
            output: "var foo = [\n\t1, 2\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 1,
                    column: 17
                }
            ]
        },
        {
            code: "var foo = [1,\n2\n];",
            output: "var foo = [\n1,\n2\n];",
            options: ["always"],
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                }
            ]
        },

        //  { multiline: false }
        {
            code: "var foo = [\n];",
            output: "var foo = [];",
            options: [{ multiline: false }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1\n];",
            output: "var foo = [1];",
            options: [{ multiline: false }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1, 2\n];",
            output: "var foo = [1, 2];",
            options: [{ multiline: false }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\n1,\n2\n];",
            output: "var foo = [1,\n2];",
            options: [{ multiline: false }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 4,
                    column: 1
                }
            ]
        },
        {
            code: "var foo = [\nfunction foo() {\ndosomething();\n}\n];",
            output: "var foo = [function foo() {\ndosomething();\n}];",
            options: [{ multiline: false }],
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayExpression",
                    line: 1,
                    column: 11
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayExpression",
                    line: 5,
                    column: 1
                }
            ]
        },

        // ArrayPattern
        // "always"
        {
            code: "var [] = foo;",
            output: "var [\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 1,
                    column: 6
                }
            ]
        },
        {
            code: "var [a] = foo;",
            output: "var [\na\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 1,
                    column: 7
                }
            ]
        },
        {
            code: "var [ // any comment\na] = foo;",
            output: "var [ // any comment\na\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var [ /* any comment */\na] = foo;",
            output: "var [ /* any comment */\na\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 2,
                    column: 2
                }
            ]
        },
        {
            code: "var [a, b] = foo;",
            output: "var [\na, b\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var [a, b // any comment\n] = foo;",
            output: "var [\na, b // any comment\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                }
            ]
        },
        {
            code: "var [a, b /* any comment */] = foo;",
            output: "var [\na, b /* any comment */\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 1,
                    column: 28
                }
            ]
        },
        {
            code: "var [a,\nb] = foo;",
            output: "var [\na,\nb\n] = foo;",
            options: ["always"],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 2,
                    column: 2
                }
            ]
        },

        // { minItems: 2 }
        {
            code: "var [\n] = foo;",
            output: "var [] = foo;",
            options: [{ minItems: 2 }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 2,
                    column: 1
                }
            ]
        },
        {
            code: "var [\na\n] = foo;",
            output: "var [a] = foo;",
            options: [{ minItems: 2 }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_NO_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_NO_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 3,
                    column: 1
                }
            ]
        },
        {
            code: "var [a, b] = foo;",
            output: "var [\na, b\n] = foo;",
            options: [{ minItems: 2 }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 1,
                    column: 10
                }
            ]
        },
        {
            code: "var [a,\nb] = foo;",
            output: "var [\na,\nb\n] = foo;",
            options: [{ minItems: 2 }],
            parserOptions: { ecmaVersion: 6 },
            errors: [
                {
                    message: ERR_BREAK_AFTER,
                    type: "ArrayPattern",
                    line: 1,
                    column: 5
                },
                {
                    message: ERR_BREAK_BEFORE,
                    type: "ArrayPattern",
                    line: 2,
                    column: 2
                }
            ]
        }

    ]
});
