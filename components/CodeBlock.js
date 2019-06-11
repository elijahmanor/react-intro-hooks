import React, { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import {
  LiveProvider,
  LiveEditor as BaseLiveEditor,
  LiveError,
  LivePreview
} from "react-live";

// Adapted from https://github.com/JReinhold/mdx-deck-live-code/blob/master/src/components/live-editor.tsx#L8
const isMacLike =
  typeof window !== "undefined" &&
  "navigator" in window &&
  /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

const LiveEditor = props => {
  const [focusEditor, setFocusEditor] = useState(true);
  const { style, className, ...trimedProps } = props;
  function blurOnKeyCombo(e) {
    if (
      event.key === "Escape" ||
      (event.key === "M" &&
        event.ctrlKey &&
        (isMacLike ? event.shiftKey : true))
    ) {
      setFocusEditor(false);
    }
  }
  return (
    <div
      onFocus={() => setFocusEditor(true)}
      onClick={() => setFocusEditor(true)}
      onBlur={() => setFocusEditor(false)}
      onKeyDown={blurOnKeyCombo}
      className={className}
      style={style}
    >
      <BaseLiveEditor contentEditable={focusEditor} {...trimedProps} />
    </div>
  );
};

export default ({
  children,
  fullScreen = false,
  className = "",
  live,
  render,
  noInline = false
}) => {
  console.log({ fullScreen });
  const language = className.replace(/language-/, "");
  const liveWrapperStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "auto"
  };
  if (!fullScreen) {
    liveWrapperStyle.boxShadow = "0 2px 10px 0 rgba(0, 0, 0, 0.5)";
    liveWrapperStyle.borderRadius = "0.25rem";
  }
  const providerWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "75vw",
    height: "50vh"
  };
  if (fullScreen) {
    providerWrapperStyle.width = "100vw";
    providerWrapperStyle.height = "100vh";
    providerWrapperStyle.maxHeight = "100vh";
    providerWrapperStyle.overflow = "auto";
  }

  if (live) {
    return (
      <div style={{ backgroundColor: "black", caretColor: "white" }}>
        <LiveProvider code={children.trim()} noInline={noInline}>
          <div style={providerWrapperStyle}>
            <div style={liveWrapperStyle}>
              <LiveEditor
                style={{
                  width: "50%"
                }}
              />
              <LivePreview
                style={{
                  width: "50%",
                  background: "white"
                }}
              />
            </div>
            <LiveError
              style={{
                width: "100%",
                height: "5rem"
              }}
            />
          </div>
        </LiveProvider>
      </div>
    );
  }

  if (render) {
    return (
      <div>
        <LiveProvider code={children}>
          <LivePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
