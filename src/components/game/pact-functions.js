import Pact from "pact-lang-api";
import { useContext, useState, useEffect } from "react";
import { PactContext } from "../../wallet/pact-wallet";
import { GameContext } from "./game-context";
import { v1 } from "uuid";
const KITTY_KADS_CONTRACT = "kitty-kad-kitties";
const CODE_SNIPPET_CONT = 'code-snippet-test'
const NEW_CODE_FUNC = 'new-snippet'
const ADOPT_FUNC = "adopt-gen-0s-bulk";
const OWNED_BY_FUNC = "kitties-owned-by";
const ALL_IDS_FUNC = "all-kitties";
const WL_ROLE_FUNC = "enforce-adopt-wl-role";
// export const ADMIN_ADDRESS =
//   "k:fd91af358418e2c8e50a501451a41de49af01f45e34bc4f1735cab293084f7ea";
export const ADMIN_ADDRESS =
  "k:f7278eeaa55a4b52c281fa694035f82a43a6711eb547fc1ab900be1ccf9fb409";

function useGetMyKitties() {
  const { account, readFromContract, defaultMeta } = useContext(PactContext);

  return async () => {
    const pactCode = `(free.${KITTY_KADS_CONTRACT}.${OWNED_BY_FUNC} "${account.account}")`;
    const meta = defaultMeta(1000000);
    return await readFromContract({ pactCode, meta });
  };
}

function useGetAllKitties() {
  const { readFromContract, defaultMeta } = useContext(PactContext);

  return async () => {
    const pactCode = '(free.code-snippet-test.read-snippets)';
    const meta = defaultMeta();
    return await readFromContract({ pactCode, meta });
  };
}
function useGetCode() {
  const { readFromContract, defaultMeta } = useContext(PactContext);

  return async (id) => {
    const pactCode = `(free.code-snippet-test.read-snippet "${id}")`;
    const meta = defaultMeta();
    return await readFromContract({ pactCode, meta });
  };
}

function useAdoptKitties() {
  const { account, gasPrice, chainId, netId, sendTransaction } =
    useContext(PactContext);
  return (title, snippet, callback) => {
    
    const pactCode = `(free.${CODE_SNIPPET_CONT}.${NEW_CODE_FUNC} "${v1()}" "${title}" "${snippet}")`;
    const cmd = {
      pactCode,
      caps:[ Pact.lang.mkCap("Gas capability", "Pay gas", "coin.GAS", []),],
      sender: account.account,
      gasLimit: 30000,
      gasPrice,
      chainId,
      ttl: 600,
      envData: {
        "user-ks": account.guard,
        account: account.account,
      },
      signingPubKey: account.guard.keys[0],
      networkId: netId,
    };
    const previewContent = (
      <p>
       Publishing
      </p>
    );
    sendTransaction(
      cmd,
      previewContent,
      'Submitting',
      callback ?? (() => alert("Published!"))
    );
  };
}



export {
  useGetMyKitties,
  useGetAllKitties,
  useAdoptKitties,
  useGetCode,
};
