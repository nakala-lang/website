import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-coy.min.css'; //Example style, you can use another

export default function MyEditor() {
  const [code, setCode] = useState(
`class List {
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
    //print("size of list is " + len(this.inner));
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

let LIST_SIZE = 100;

let list = List(LIST_SIZE);
list.set(LIST_SIZE - 2, 1);
list.set(LIST_SIZE - 1, 1);

let iter = 0;
until iter == LIST_SIZE {
  print(list.str());
  iter = iter + 1;
  
  //print("creating new list");
  let new_list = List(LIST_SIZE);
  //print("finished creating new list");

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
}`
//func fib(n: int) -> int {
//  if n <= 1 {
//    ret n;
//  }
//  
//  ret fib(n-1) + fib(n-2);
//}
//
//print(fib(15));`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState("");

  const runCode = async () => {
    try {
      let js = await import("@nakala-lang/nakjs");
      let res = js.wasm_interpret(code);
      setResult(res);
      console.log(res);
    } catch (err) {
      window.alert("Failed to import interpreter");
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, NakalaPrismConfig)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          backgroundColor: "rgba(0,0,0,0.05)",
          fontSize: 12,
        }}
      />
      <div className="mt-1" />
      <button className="bg-slate-200 px-4 rounded-sm" onClick={() => {
        setIsRunning(true);
        setTimeout(runCode, 100);
      }}>Run</button>
      <div className="py-2">Result:</div>
      <textarea className="h-64 w-full bg-slate-50 font-mono" value={isRunning ? "Loading..." : result} />
    </div>
  );
}

const NakalaPrismConfig = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor))/,
      lookbehind: true
    }
  ],
  'keyword': [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|class|const|until|else|enum|func|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|ret|static|this|null)\b/,
      lookbehind: true
    },
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(
      /(^|[^\w$])/.source +
      '(?:' +
      (
        // constant
        /NaN|Infinity/.source +
        '|' +
        // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source +
        '|' +
        // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
        '|' +
        // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
        '|' +
        // decimal bigint
        /\d+(?:_\d+)*n/.source +
        '|' +
        // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
      ) +
      ')' +
      /(?![\w$])/.source
    ),
    lookbehind: true
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
      // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source +
      '(?:' +
      /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
      '|' +
      // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
      ')' +
      // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: Prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/,
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|ret|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

