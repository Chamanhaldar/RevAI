import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/react-simple-code-editor/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-simple-code-editor/lib/index.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __importStar(require_react());
    var KEYCODE_Y = 89;
    var KEYCODE_Z = 90;
    var KEYCODE_M = 77;
    var KEYCODE_PARENS = 57;
    var KEYCODE_BRACKETS = 219;
    var KEYCODE_QUOTE = 222;
    var KEYCODE_BACK_QUOTE = 192;
    var HISTORY_LIMIT = 100;
    var HISTORY_TIME_GAP = 3e3;
    var isWindows = typeof window !== "undefined" && "navigator" in window && /Win/i.test(navigator.platform);
    var isMacLike = typeof window !== "undefined" && "navigator" in window && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    var className = "npm__react-simple-code-editor__textarea";
    var cssText = (
      /* CSS */
      "\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.".concat(className, ":empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .").concat(className, " {\n    color: transparent !important;\n  }\n\n  .").concat(className, "::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n")
    );
    var Editor = React.forwardRef(function Editor2(props, ref) {
      var autoFocus = props.autoFocus, disabled = props.disabled, form = props.form, highlight = props.highlight, _a = props.ignoreTabKey, ignoreTabKey = _a === void 0 ? false : _a, _b = props.insertSpaces, insertSpaces = _b === void 0 ? true : _b, maxLength = props.maxLength, minLength = props.minLength, name = props.name, onBlur = props.onBlur, onClick = props.onClick, onFocus = props.onFocus, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, onValueChange = props.onValueChange, _c = props.padding, padding = _c === void 0 ? 0 : _c, placeholder = props.placeholder, preClassName = props.preClassName, readOnly = props.readOnly, required = props.required, style = props.style, _d = props.tabSize, tabSize = _d === void 0 ? 2 : _d, textareaClassName = props.textareaClassName, textareaId = props.textareaId, value = props.value, rest = __rest(props, ["autoFocus", "disabled", "form", "highlight", "ignoreTabKey", "insertSpaces", "maxLength", "minLength", "name", "onBlur", "onClick", "onFocus", "onKeyDown", "onKeyUp", "onValueChange", "padding", "placeholder", "preClassName", "readOnly", "required", "style", "tabSize", "textareaClassName", "textareaId", "value"]);
      var historyRef = React.useRef({
        stack: [],
        offset: -1
      });
      var inputRef = React.useRef(null);
      var _e = React.useState(true), capture = _e[0], setCapture = _e[1];
      var contentStyle = {
        paddingTop: typeof padding === "object" ? padding.top : padding,
        paddingRight: typeof padding === "object" ? padding.right : padding,
        paddingBottom: typeof padding === "object" ? padding.bottom : padding,
        paddingLeft: typeof padding === "object" ? padding.left : padding
      };
      var highlighted = highlight(value);
      var getLines = function(text, position) {
        return text.substring(0, position).split("\n");
      };
      var recordChange = React.useCallback(function(record, overwrite) {
        var _a2, _b2, _c2;
        if (overwrite === void 0) {
          overwrite = false;
        }
        var _d2 = historyRef.current, stack = _d2.stack, offset = _d2.offset;
        if (stack.length && offset > -1) {
          historyRef.current.stack = stack.slice(0, offset + 1);
          var count = historyRef.current.stack.length;
          if (count > HISTORY_LIMIT) {
            var extras = count - HISTORY_LIMIT;
            historyRef.current.stack = stack.slice(extras, count);
            historyRef.current.offset = Math.max(historyRef.current.offset - extras, 0);
          }
        }
        var timestamp = Date.now();
        if (overwrite) {
          var last = historyRef.current.stack[historyRef.current.offset];
          if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
            var re = /[^a-z0-9]([a-z0-9]+)$/i;
            var previous = (_a2 = getLines(last.value, last.selectionStart).pop()) === null || _a2 === void 0 ? void 0 : _a2.match(re);
            var current = (_b2 = getLines(record.value, record.selectionStart).pop()) === null || _b2 === void 0 ? void 0 : _b2.match(re);
            if ((previous === null || previous === void 0 ? void 0 : previous[1]) && ((_c2 = current === null || current === void 0 ? void 0 : current[1]) === null || _c2 === void 0 ? void 0 : _c2.startsWith(previous[1]))) {
              historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, record), { timestamp });
              return;
            }
          }
        }
        historyRef.current.stack.push(__assign(__assign({}, record), { timestamp }));
        historyRef.current.offset++;
      }, []);
      var recordCurrentState = React.useCallback(function() {
        var input = inputRef.current;
        if (!input)
          return;
        var value2 = input.value, selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
        recordChange({
          value: value2,
          selectionStart,
          selectionEnd
        });
      }, [recordChange]);
      var updateInput = function(record) {
        var input = inputRef.current;
        if (!input)
          return;
        input.value = record.value;
        input.selectionStart = record.selectionStart;
        input.selectionEnd = record.selectionEnd;
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(record.value);
      };
      var applyEdits = function(record) {
        var input = inputRef.current;
        var last = historyRef.current.stack[historyRef.current.offset];
        if (last && input) {
          historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, last), { selectionStart: input.selectionStart, selectionEnd: input.selectionEnd });
        }
        recordChange(record);
        updateInput(record);
      };
      var undoEdit = function() {
        var _a2 = historyRef.current, stack = _a2.stack, offset = _a2.offset;
        var record = stack[offset - 1];
        if (record) {
          updateInput(record);
          historyRef.current.offset = Math.max(offset - 1, 0);
        }
      };
      var redoEdit = function() {
        var _a2 = historyRef.current, stack = _a2.stack, offset = _a2.offset;
        var record = stack[offset + 1];
        if (record) {
          updateInput(record);
          historyRef.current.offset = Math.min(offset + 1, stack.length - 1);
        }
      };
      var handleKeyDown = function(e) {
        if (onKeyDown) {
          onKeyDown(e);
          if (e.defaultPrevented) {
            return;
          }
        }
        if (e.key === "Escape") {
          e.currentTarget.blur();
        }
        var _a2 = e.currentTarget, value2 = _a2.value, selectionStart = _a2.selectionStart, selectionEnd = _a2.selectionEnd;
        var tabCharacter = (insertSpaces ? " " : "	").repeat(tabSize);
        if (e.key === "Tab" && !ignoreTabKey && capture) {
          e.preventDefault();
          if (e.shiftKey) {
            var linesBeforeCaret = getLines(value2, selectionStart);
            var startLine_1 = linesBeforeCaret.length - 1;
            var endLine_1 = getLines(value2, selectionEnd).length - 1;
            var nextValue = value2.split("\n").map(function(line2, i) {
              if (i >= startLine_1 && i <= endLine_1 && line2.startsWith(tabCharacter)) {
                return line2.substring(tabCharacter.length);
              }
              return line2;
            }).join("\n");
            if (value2 !== nextValue) {
              var startLineText = linesBeforeCaret[startLine_1];
              applyEdits({
                value: nextValue,
                // Move the start cursor if first line in selection was modified
                // It was modified only if it started with a tab
                selectionStart: (startLineText === null || startLineText === void 0 ? void 0 : startLineText.startsWith(tabCharacter)) ? selectionStart - tabCharacter.length : selectionStart,
                // Move the end cursor by total number of characters removed
                selectionEnd: selectionEnd - (value2.length - nextValue.length)
              });
            }
          } else if (selectionStart !== selectionEnd) {
            var linesBeforeCaret = getLines(value2, selectionStart);
            var startLine_2 = linesBeforeCaret.length - 1;
            var endLine_2 = getLines(value2, selectionEnd).length - 1;
            var startLineText = linesBeforeCaret[startLine_2];
            applyEdits({
              value: value2.split("\n").map(function(line2, i) {
                if (i >= startLine_2 && i <= endLine_2) {
                  return tabCharacter + line2;
                }
                return line2;
              }).join("\n"),
              // Move the start cursor by number of characters added in first line of selection
              // Don't move it if it there was no text before cursor
              selectionStart: startLineText && /\S/.test(startLineText) ? selectionStart + tabCharacter.length : selectionStart,
              // Move the end cursor by total number of characters added
              selectionEnd: selectionEnd + tabCharacter.length * (endLine_2 - startLine_2 + 1)
            });
          } else {
            var updatedSelection = selectionStart + tabCharacter.length;
            applyEdits({
              // Insert tab character at caret
              value: value2.substring(0, selectionStart) + tabCharacter + value2.substring(selectionEnd),
              // Update caret position
              selectionStart: updatedSelection,
              selectionEnd: updatedSelection
            });
          }
        } else if (e.key === "Backspace") {
          var hasSelection = selectionStart !== selectionEnd;
          var textBeforeCaret = value2.substring(0, selectionStart);
          if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
            e.preventDefault();
            var updatedSelection = selectionStart - tabCharacter.length;
            applyEdits({
              // Remove tab character at caret
              value: value2.substring(0, selectionStart - tabCharacter.length) + value2.substring(selectionEnd),
              // Update caret position
              selectionStart: updatedSelection,
              selectionEnd: updatedSelection
            });
          }
        } else if (e.key === "Enter") {
          if (selectionStart === selectionEnd) {
            var line = getLines(value2, selectionStart).pop();
            var matches = line === null || line === void 0 ? void 0 : line.match(/^\s+/);
            if (matches === null || matches === void 0 ? void 0 : matches[0]) {
              e.preventDefault();
              var indent = "\n" + matches[0];
              var updatedSelection = selectionStart + indent.length;
              applyEdits({
                // Insert indentation character at caret
                value: value2.substring(0, selectionStart) + indent + value2.substring(selectionEnd),
                // Update caret position
                selectionStart: updatedSelection,
                selectionEnd: updatedSelection
              });
            }
          }
        } else if (e.keyCode === KEYCODE_PARENS || e.keyCode === KEYCODE_BRACKETS || e.keyCode === KEYCODE_QUOTE || e.keyCode === KEYCODE_BACK_QUOTE) {
          var chars = void 0;
          if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
            chars = ["(", ")"];
          } else if (e.keyCode === KEYCODE_BRACKETS) {
            if (e.shiftKey) {
              chars = ["{", "}"];
            } else {
              chars = ["[", "]"];
            }
          } else if (e.keyCode === KEYCODE_QUOTE) {
            if (e.shiftKey) {
              chars = ['"', '"'];
            } else {
              chars = ["'", "'"];
            }
          } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
            chars = ["`", "`"];
          }
          if (selectionStart !== selectionEnd && chars) {
            e.preventDefault();
            applyEdits({
              value: value2.substring(0, selectionStart) + chars[0] + value2.substring(selectionStart, selectionEnd) + chars[1] + value2.substring(selectionEnd),
              // Update caret position
              selectionStart,
              selectionEnd: selectionEnd + 2
            });
          }
        } else if ((isMacLike ? (
          // Trigger undo with ⌘+Z on Mac
          e.metaKey && e.keyCode === KEYCODE_Z
        ) : (
          // Trigger undo with Ctrl+Z on other platforms
          e.ctrlKey && e.keyCode === KEYCODE_Z
        )) && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          undoEdit();
        } else if ((isMacLike ? (
          // Trigger redo with ⌘+Shift+Z on Mac
          e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey
        ) : isWindows ? (
          // Trigger redo with Ctrl+Y on Windows
          e.ctrlKey && e.keyCode === KEYCODE_Y
        ) : (
          // Trigger redo with Ctrl+Shift+Z on other platforms
          e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey
        )) && !e.altKey) {
          e.preventDefault();
          redoEdit();
        } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
          e.preventDefault();
          setCapture(function(prev) {
            return !prev;
          });
        }
      };
      var handleChange = function(e) {
        var _a2 = e.currentTarget, value2 = _a2.value, selectionStart = _a2.selectionStart, selectionEnd = _a2.selectionEnd;
        recordChange({
          value: value2,
          selectionStart,
          selectionEnd
        }, true);
        onValueChange(value2);
      };
      React.useEffect(function() {
        recordCurrentState();
      }, [recordCurrentState]);
      React.useImperativeHandle(ref, function() {
        return {
          get session() {
            return {
              history: historyRef.current
            };
          },
          set session(session) {
            historyRef.current = session.history;
          }
        };
      }, []);
      return React.createElement(
        "div",
        __assign({}, rest, { style: __assign(__assign({}, styles.container), style) }),
        React.createElement("pre", __assign({ className: preClassName, "aria-hidden": "true", style: __assign(__assign(__assign({}, styles.editor), styles.highlight), contentStyle) }, typeof highlighted === "string" ? { dangerouslySetInnerHTML: { __html: highlighted + "<br />" } } : { children: highlighted })),
        React.createElement("textarea", { ref: function(c) {
          return inputRef.current = c;
        }, style: __assign(__assign(__assign({}, styles.editor), styles.textarea), contentStyle), className: className + (textareaClassName ? " ".concat(textareaClassName) : ""), id: textareaId, value, onChange: handleChange, onKeyDown: handleKeyDown, onClick, onKeyUp, onFocus, onBlur, disabled, form, maxLength, minLength, name, placeholder, readOnly, required, autoFocus, autoCapitalize: "off", autoComplete: "off", autoCorrect: "off", spellCheck: false, "data-gramm": false }),
        React.createElement("style", { dangerouslySetInnerHTML: { __html: cssText } })
      );
    });
    var styles = {
      container: {
        position: "relative",
        textAlign: "left",
        boxSizing: "border-box",
        padding: 0,
        overflow: "hidden"
      },
      textarea: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        resize: "none",
        color: "inherit",
        overflow: "hidden",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        WebkitTextFillColor: "transparent"
      },
      highlight: {
        position: "relative",
        pointerEvents: "none"
      },
      editor: {
        margin: 0,
        border: 0,
        background: "none",
        boxSizing: "inherit",
        display: "inherit",
        fontFamily: "inherit",
        fontSize: "inherit",
        fontStyle: "inherit",
        fontVariantLigatures: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        lineHeight: "inherit",
        tabSize: "inherit",
        textIndent: "inherit",
        textRendering: "inherit",
        textTransform: "inherit",
        whiteSpace: "pre-wrap",
        wordBreak: "keep-all",
        overflowWrap: "break-word"
      }
    };
    exports.default = Editor;
  }
});
export default require_lib();
//# sourceMappingURL=react-simple-code-editor.js.map
