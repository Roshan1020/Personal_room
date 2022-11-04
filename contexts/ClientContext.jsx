// import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import {
  createContext,
  // useCallback,
  useContext,
  // useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Context
 */
export const ClientContext = createContext();

/**
 * Provider
 */
export function ClientContextProvider({ children }) {
  const [signer, setSigner] = useState();
  const [accounts, setAccounts] = useState();
  const [provider, setProvider] = useState();

  const connect = async () => {
    console.log('connect');
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "066cc530615841fb80beca0b8fe19d0e",
        },
      },
    }
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      providerOptions,
    });
    const instance = await web3Modal.connect();
    const _provider = new ethers.providers.Web3Provider(instance);
    setSigner(_provider.getSigner())
    setProvider(_provider);

    // Subscribe to accounts change
    _provider.on("accountsChanged", (accounts) => {
      setAccounts(accounts);
    });

    // Subscribe to chainId change
    _provider.on("chainChanged", (chainId) => {
      console.log(chainId, 'chainChanged');
    });

    // Subscribe to session disconnection
    _provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });
  }

  const value = useMemo(
    () => ({
      // pairings,
      // isInitializing,
      // balances,
      // isFetchingBalances,
      accounts,
      provider,
      // chains,
      // client,
      // session,
      connect,
      // disconnect,
      // setChains,
      signer
    }),
    [
      // pairings,
      // isInitializing,
      // balances,
      // isFetchingBalances,
      accounts,
      provider,
      // chains,
      // client,
      // session,
      connect,
      // disconnect,
      // setChains,
      signer
    ]
  );

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      "useWalletConnectClient must be used within a ClientContextProvider"
    );
  }
  return context;
}

