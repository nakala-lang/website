import React, { useEffect, useState } from "react";
import ReactEditor from "react-simple-code-editor";
import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-coy.min.css"; //Example style, you can use another
import Prism, { TokenObject } from "prismjs";

const examples = [
  {
    title: "Fibonacci",
    code: `func fib(n: int) -> int {
  if n <= 1 {
    ret n;
  }
  
  ret fib(n-1) + fib(n-2);
}

print(fib(15));`,
  },
  {
    title: "Linked List",
    code: `class Node {
  constructor(data: int, next) {
    this.data = data;
    this.next = next;
  }
  
  str() {
    let str = "";
    str = str + this.data;
    
    if this.next != null {
      str = str + " -> " + this.next.str();
    }

    ret str;
  }
}

let head = Node(1, Node(2, Node(3, Node(4, Node(5, null)))));
print(head.str());
`,
  },
  {
    title: "Rule 110",
    code: `class List {
  constructor(size: int) {
    this.inner = [0; size];
  }

  set(index: int, value: int) {
    this.inner[index] = value;
  }

  get(index: int) -> int {
    ret this.inner[index];
  }

  str() -> string {
    let s = "";

    let i = 0;
    until i == len(this.inner) {
      if this.inner[i] == 0 {
        s = s + " ";
      } else {
        s = s + "X";
      }

      i = i + 1;
    }

    ret s;
  }
}

let LIST_SIZE = 50;

let list = List(LIST_SIZE);
list.set(LIST_SIZE - 2, 1);
list.set(LIST_SIZE - 1, 1);

let iter = 0;
until iter == LIST_SIZE {
  print(list.str());
  iter = iter + 1;

  let new_list = List(LIST_SIZE);

  let idx = 0;
  until idx == LIST_SIZE {
    let prev_val = 0;
    if idx != 0 {
      prev_val = list.get(idx - 1);
    }

    let curr_val = list.get(idx);

    let next_val = 0;
    if idx != LIST_SIZE - 1 {
      next_val = list.get(idx + 1);
    }

    let as_str = "" + prev_val + curr_val + next_val;
    let new_val = 0;
    if as_str == "111" {
      new_val = 0;
    } else if as_str == "110" {
      new_val = 1;
    } else if as_str == "101" {
      new_val = 1;
    } else if as_str == "100" {
      new_val = 0;
    } else if as_str == "011" {
      new_val = 1;
    } else if as_str == "010" {
      new_val = 1;
    } else if as_str == "001" {
      new_val = 1;
    } else {
      new_val = 0;
    }

    new_list.set(idx, new_val);

    idx = idx + 1;
  }

  list = new_list;
}`,
  },
  {
    title: "First-class Functions (aka Closures)",
    code: `// Notice how nakala supports typechecking for functions via function types!
func callFuncWith10(f: (int) -> int) {
  ret f(10);
}

func add5(x: int) -> int {
  ret x + 5;
}

print(callFuncWith10(add5));`,
  },
  {
    title: "First-class Classes",
    code: `// My personal favorite feature of nakala is first-class classes.
// This means you can pass around not only class instances, but also
// **class definitions** (!) as values.

class MultiplierTask {
  constructor(factor: int) {
    this.factor = factor; 
  }
  
  pipe(v: int) -> int {
    ret this.factor * v;
  }
}

func pipeline(input: int, task_args: [int], task) -> int {
  let i = 0;
  let bound = len(task_args);
    
  let curr = input;
  until i == bound {
    let modifier = task_args[i];
    curr = task(modifier).pipe(curr);
    i = i + 1;
  }
  
  ret curr;
}

// Notice how we aren't passing an _instance_ of MultiplierTask, we are 
// literally passing the _definition_ of MultiplierTask, gets
// constructed later.
let res = pipeline(1, [1,2,3,4,5], MultiplierTask);
print(res);`,
  },
  {
    title: "Static Type Checking",
    code: `func myFunc(a: int, b: int) -> int {
  ret a + b;
}

class Consumer {
  // This is fine
  consume(callee: (int, int) -> int, a: int, b: int) -> int {
    ret callee(a,b);
  }
  
  // This is not fine
  consume(c: (int, int) -> string, a: int, b: int) -> int {
    ret c(a,b);
  }
}`,
  },
  {
    title: "Enums",
    code: `enum Type { String, Boolean, Number }

class JsonValue {
  constructor(v: any, ty: Type) {
    this.v = v;
    this.ty = ty;
  }
  
  str() -> string {
    if this.ty == Type.String {
      ret "'" + this.v + "'";
    }
    
    ret this.v;
  }
}

let vals = [
  JsonValue(false, Type.Boolean), 
  JsonValue("hi", Type.String),
  JsonValue(1.5, Type.Number)
];

let i = 0;
until i == len(vals) {
  let t = vals[i];
  print(t.str());
  
  i = i + 1;
}`,
  },
];

export default function Editor() {
  const [code, setCode] = useState(`let x = 10;
print(10);`);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("");

  const runCode = async () => {
    try {
      let js = await import("@nakala-lang/nakjs");
      let res = js.wasm_interpret(code);
      setResult(res);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runCode();
  }, [code, runCode]);

  return (
    <div>
      <div>
        <p className="text-lg">Examples:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {examples.map((item, index) => (
            <button
              key={index}
              className="px-2 py-1 bg-gray-300 hover:bg-opacity-50"
              onClick={() => setCode(item.code)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <ReactEditor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, NakalaPrismConfig)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          backgroundColor: "rgba(0,0,0,0.05)",
          fontSize: 16,
        }}
      />
      <div className="mt-1" />
      <div className="py-2">Result:</div>
      <textarea
        readOnly
        className="h-64 w-full bg-slate-50 font-mono text-sm"
        value={isRunning ? "Loading..." : result}
      />
    </div>
  );
}

const NakalaPrismConfig = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"] as TokenObject,
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor))/,
      lookbehind: true,
    },
  ],
  keyword: [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true,
    },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|class|const|until|else|enum|func|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|ret|static|this|null)\b/,
      lookbehind: true,
    },
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      /(^|[^\w$])/.source +
        "(?:" +
        // constant
        (/NaN|Infinity/.source +
          "|" +
          // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source +
          "|" +
          // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
          "|" +
          // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
          "|" +
          // decimal bigint
          /\d+(?:_\d+)*n/.source +
          "|" +
          // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
            .source) +
        ")" +
        /(?![\w$])/.source
    ),
    lookbehind: true,
  },
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
});

Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: RegExp(
      // lookbehind
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
        // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source +
        "(?:" +
        /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/
          .source +
        "|" +
        // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/
          .source +
        ")" +
        // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex,
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/,
    },
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern:
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function",
  },
  parameter: [
    {
      pattern:
        /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern:
        /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
    {
      pattern:
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|ret|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript,
    },
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
});
