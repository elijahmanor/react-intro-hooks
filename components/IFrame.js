import React, { useState } from "react";
import styled from "styled-components";
import { useDeck } from "mdx-deck";
import { useHotkeys } from "react-hotkeys-hook";
import useClipboard from "react-hook-clipboard";
import { navigate } from "@reach/router";

const Frame = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 20000;
`;

export function CodeSandbox({
  id = "",
  backupId = "",
  fontSize = "20",
  hideNavigation = false,
  expandDevTools = false,
  view = "preview", // "preview", "editor", ""
  module = "",
  initialPath = "",
  code = "",
}) {
  const { slug, index } = useDeck();
  const [useBackup, setUseBackup] = useState(false);
  const [, copyToClipboard] = useClipboard();
  const src = window.encodeURI(
    `https://codesandbox.io/embed/${
      useBackup && backupId ? backupId : id
    }?view=${view}&fontsize=${fontSize}&hidenavigation=${
      hideNavigation ? 1 : 0
    }&expanddevtools=${
      expandDevTools ? 1 : 0
    }&module=${module}&initialpath=${initialPath}`
  );
  useHotkeys("ctrl+b", () => setUseBackup(!useBackup));
  useHotkeys("ctrl+c", () => copyToClipboard(code));
  return (
    <>
      <Frame
        src={src}
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <svg
        width="3.5rem"
        height="3.5rem"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20001,
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        <polygon
          points="100 0, 100 100, 0 100"
          fill="white"
          stroke="gray"
        />
        <text
          onClick={() =>
            navigate([slug, index + 1].join("/"))
          }
          x="60"
          y="75"
          fill="gray"
        >
          →
        </text>
      </svg>
    </>
  );
}

export function Glitch({
  id = "",
  backupId = "",
  view = "preview", // "preview", "editor"
  initialPath = "",
}) {
  const { slug, index } = useDeck();
  const [useBackup, setUseBackup] = useState(false);
  const src = `https://glitch.com/embed/#!/embed/${
    useBackup && backupId ? backupId : id
  }?path=${initialPath}&previewSize=${
    view === "preview" ? 100 : 0
  }`;
  useHotkeys("ctrl+b", () => setUseBackup(!useBackup));
  return (
    <>
      <Frame
        src={src}
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <svg
        width="3.5rem"
        height="3.5rem"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20001,
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        <polygon
          points="100 0, 100 100, 0 100"
          fill="white"
          stroke="gray"
        />
        <text
          onClick={() =>
            navigate([slug, index + 1].join("/"))
          }
          x="60"
          y="75"
          fill="gray"
        >
          →
        </text>
      </svg>
    </>
  );
}

export default function IFrame({
  src = "",
  backupSrc = "",
  style = {},
  code = "",
}) {
  const { slug, index } = useDeck();
  const [useBackup, setUseBackup] = useState(false);
  const [, copyToClipboard] = useClipboard();
  useHotkeys("ctrl+b", () => setUseBackup(!useBackup));
  useHotkeys(
    "ctrl+m",
    () => console.log("bla") || copyToClipboard(code)
  );
  return (
    <>
      <Frame
        style={style}
        src={useBackup && backupSrc ? backupSrc : src}
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <svg
        width="3.5rem"
        height="3.5rem"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20001,
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        <polygon
          points="100 0, 100 100, 0 100"
          fill="white"
          stroke="gray"
        />
        <text
          onClick={() =>
            navigate([slug, index + 1].join("/"))
          }
          x="60"
          y="75"
          fill="gray"
        >
          →
        </text>
      </svg>
    </>
  );
}
