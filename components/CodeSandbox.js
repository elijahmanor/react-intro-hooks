import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDeck } from "@mdx-deck/components";
import { useHotkeys } from "react-hotkeys-hook";

const Frame = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  z-index: 20000;
`;

/*
<iframe
    src="https://codesandbox.io/embed/tic-tac-toe-usestate-memo-ddj1j?fontsize=14"
    title="Tic-Tac-Toe useState memo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin">
</iframe>

https://codesandbox.io/embed/mymjpv3l48?expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2FLightSaber.js&view=editor
*/

const CodeSanbox = ({
  id = "",
  backupId = "",
  fontSize = "20",
  hideNavigation = false,
  expandDevTools = false,
  view = "preview",
  initialPath = ""
}) => {
  const state = useDeck();
  const [useBackup, setUseBackup] = useState(false);
  const src = `https://codesandbox.io/embed/${
    useBackup && backupId ? backupId : id
  }?view=${view}&fontsize=${fontSize}&hidenavigation=${
    hideNavigation ? 1 : 0
  }&expanddevtools=${expandDevTools ? 1 : 0}&initialpath=${initialPath}`;
  useHotkeys("ctrl+b", () => setUseBackup(!useBackup));
  return (
    <>
      <Frame
        src={src}
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <svg
        width="75px"
        height="75px"
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 20001
        }}
      >
        <polygon points="100 0, 100 100, 0 100" fill="white" stroke="gray" />
        <text onClick={() => state.next()} x="60" y="75" fill="gray">
          →
        </text>
      </svg>
    </>
  );
};

// ⇨ ➡ →➢ ➣ ➤⇢ ⤍⤑⤐⥤⟹⇒⤇⟼⤳↪⮑➩ ➪ ➫ ➬ ➭ ➮ ➯ ➱➛ ➜ ➔ ➝ ➞ ➟ ➠ ➧ ➨►▻▶

export default CodeSanbox;
