import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../game-context";
import { SCREENS } from "../consts";
import {
  useGetAllKitties,
  useAdoptKitties,
  ADMIN_ADDRESS,
} from "../pact-functions";
import { PactContext } from "../../../wallet/pact-wallet";

export default function ScreenContainer(props) {
  const { currScreen } = useContext(GameContext);
  return (
    <div style={screensStyle}>
      {currScreen == null && <Landing />}
      {currScreen === SCREENS.ALL_KITTIES && <AllKitties />}
      {currScreen === SCREENS.ADOPT && <AdoptKitties />}
    </div>
  );
}

function Landing() {
  const { account, netId } = useContext(PactContext);
  return (
    <KittyGuideWithContent>
      <div>
        <p>Welcome to the Code Sharing Platform</p>
        {account?.account == null && <ConnectWalletText />}
        {account?.account != null && (
          <p>Create and Share your code snippet with others</p>
        )}
      </div>
    </KittyGuideWithContent>
  );
}


function AdoptKitties() {
  const ADOPT_FOR_ALL = true;
  const { account } = useContext(PactContext);
  const hasAccount = account?.account != null;

  let content = null;
 if (!hasAccount) {
    content = (
      <>
        <p>Can't Create Code without a wallet!</p>
        <ConnectWalletText />
      </>
    );
  } else {
    content = <AdoptKittiesInteraction />;
  }

  return (
    <KittyGuideWithContent>
      <div>{content}</div>
    </KittyGuideWithContent>
  );
}

function AdoptKittiesInteraction() {
  const adoptKitties = useAdoptKitties();
  const [title, setTitle] = useState("this is example title");
  const [snippet, setSnippet] = useState("print('this is example code snippet')");

  const { pricePerKitty, setCurrScreen } = useContext(GameContext);

  return (
    <div>
      <form>
  <div className="form-group">
    <label >Title</label> <div>&nbsp;</div>
    <input
            style={{
              borderRadius: 5,
              width: 500,
              border: "none",
              textAlign: "left",
              height: "2em",
            }}
            type="text"
            defaultValue={title}
            onChange={(e) => {
              const val = e?.target?.value;
              setTitle(val);
            }}
          />
  </div>
  <div className="form-group">
  <label className="form-check-label" >Snippet</label>
  <textarea
            style={{
              borderRadius: 5,
              width: 500,
              border: "none",
              textAlign: "left",
              height: 300,
            }}
            type="text"
            defaultValue={snippet}
            onChange={(e) => {
              const val = e?.target?.value;
              setSnippet(val);
            }}
          />
  
  </div>
</form>

 
     
        
         
      
         <br></br><br></br>
        <button
          className="btn btn-success"
          onClick={() =>
            adoptKitties(title,snippet, () => {
              setCurrScreen(SCREENS.MY_KITTIES);
            })
          }
        >
          Publish
        </button>
    </div>
  );
}

function AllKitties() {
  const getAllKitties = useGetAllKitties();
  const { allKitties, setAllKitties } =
    useContext(GameContext);

  useEffect(() => {
    const fetchKitties = async () => {
      var aKitties = await getAllKitties();
      setAllKitties(aKitties)
    };
    fetchKitties();
  }, []);
  useEffect(() => {
    // Not ready to start fetching kitties
    if (
      allKitties == null ||
      allKitties.length === 0
    ) {
      return;
    }

  }, [allKitties, setAllKitties]);
  return ( <table className="table">
  <thead>
    <tr>
      <th scope="col">
       Code Title
      </th>
    </tr>
  </thead>
  <KittiesList
  kitties={(allKitties?.length > 0 && allKitties) || null}
 
/>
   </table>

  );
}

function KittiesList({
  kitties,
  loading,
  empty,
}) {

  const hasKitties = kitties != null && kitties.length > 0;
  const extraStyle = { overflowY: "scroll" };
  if (hasKitties === true) {
    extraStyle.justifyContent = "flex-start";
  }
  return (
     
        <tbody>
   
        {kitties == null && loading}
        {kitties?.length === 0 && empty}
        {kitties != null && (
          <>
            {kitties.map((kitty) => {
              return (
                <tr key={kitty.id}>
                  <td key={kitty.id}   >
                    <a href={"/code?id="+kitty.id}>{kitty.title}</a>
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
  );
}


function CenterColumn({ children, extraStyle }) {
  return (
    <div style={{ ...centerColumnStyle, ...extraStyle, width: "100%" }}>
      {children}
    </div>
  );
}

function KittyGuideWithContent({ children }) {
  return (
    <CenterColumn extraStyle={{ flexDirection: "row" }}>
      <div style={{ width: 400 }}>{children}</div>
    </CenterColumn>
  );
}


function ConnectWalletText() {
  const { openConnectWallet } = useContext(PactContext);
  return (
    <div>
      <p>
        <span
          onClick={openConnectWallet}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Connect wallet{" "}
        </span>{" "}
        to get started <br />
        or explore existing kitties
      </p>
    </div>
  );
}


const screensStyle = {
  display: "flex",
  height: "600px",
  width: "100%",
  // overflowY: "scroll",
  "&::WebkitScrollbar": { width: 5 },
  padding: "20 0",

  //   flexDirection: "column",
};

const centerColumnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
