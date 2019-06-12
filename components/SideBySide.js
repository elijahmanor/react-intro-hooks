import React from "react";
import Highlight, {
  defaultProps
} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/duotoneLight";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

const getLineColor = (index, rules) =>
  rules.reduce((memo, rule) => {
    if (rule.lines.includes(index)) {
      memo = rule.color;
    }
    return memo;
  }, "");

const SideBySide = ({ before, after, intents }) =>
  console.log("SideBySide", { before, after, intents }) || (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Highlight
          {...defaultProps}
          theme={theme}
          code={before}
          language="jsx"
        >
          {({
            className,
            style,
            tokens,
            getLineProps,
            getTokenProps
          }) => (
            <Pre
              className={className}
              style={{ ...style, flexGrow: 1 }}
            >
              {tokens.map((line, i) => (
                <div
                  {...getLineProps({ line, key: i })}
                  style={{
                    backgroundColor: getLineColor(
                      i,
                      intents.before
                    )
                  }}
                >
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => (
                    <span
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>
        <Highlight
          {...defaultProps}
          theme={theme}
          code={after}
          language="jsx"
        >
          {({
            className,
            style,
            tokens,
            getLineProps,
            getTokenProps
          }) => (
            <Pre
              className={className}
              style={{ ...style, flexGrow: 1 }}
            >
              {tokens.map((line, i) => (
                <div
                  {...getLineProps({ line, key: i })}
                  style={{
                    backgroundColor: getLineColor(
                      i,
                      intents.after
                    )
                  }}
                >
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => (
                    <span
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>
      </div>
    </Wrapper>
  );

export default SideBySide;
