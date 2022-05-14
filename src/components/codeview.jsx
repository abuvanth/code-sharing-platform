import { Navigation } from "./navigation";
import { Footer } from "./footer";
import React, { useContext, useState, useEffect } from "react";
import {
    useGetCode
  } from "./game/pact-functions";
  import {
    PactContext,
    TEST_NET_ID,
    MAIN_NET_ID,
  } from "../wallet/pact-wallet";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeView() {
    const { useSetNetworkSettings } = useContext(PactContext);
    const [ code, setCode] = useState('');
    useSetNetworkSettings(TEST_NET_ID, "1");
    const gCode = useGetCode();
    useEffect(() => {
        const getCode = async () => {
         let id = (new URLSearchParams(window.location.search)).get("id")
          var aCode = await gCode(id);
        setCode(aCode)
        };
        getCode();
      }, []);
    

    return (
        <div>
        <Navigation/>
      <div className="container">
          <h3 id="title">{code.title}</h3>
          <AceEditor
          mode="java"
    theme="github"
    value={code.snippet}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
  />,
      </div>
  <Footer/>
  </div>
    );
  }
  