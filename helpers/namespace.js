import { ProposalTypes } from "@walletconnect/types";
/**
 * EIP155
 */
export const DEFAULT_EIP155_METHODS = {
  ETH_SEND_TRANSACTION : "eth_sendTransaction",
  ETH_SIGN_TRANSACTION : "eth_signTransaction",
  ETH_SIGN : "eth_sign",
  PERSONAL_SIGN : "personal_sign",
  ETH_SIGN_TYPED_DATA : "eth_signTypedData",
}

export const DEFAULT_EIP_155_EVENTS = {
  ETH_CHAIN_CHANGED : "chainChanged",
  ETH_ACCOUNTS_CHANGED : "accountsChanged",
}


export const getNamespacesFromChains = (chains) => {
  const supportedNamespaces: string[] = [];
  chains.forEach((chainId) => {
    const [namespace] = chainId.split(":");
    if (!supportedNamespaces.includes(namespace)) {
      supportedNamespaces.push(namespace);
    }
  });

  return supportedNamespaces;
};

export const getSupportedMethodsByNamespace = (namespace) => {
  switch (namespace) {
    case "eip155":
      return Object.values(DEFAULT_EIP155_METHODS);
    case "cosmos":
      return Object.values(DEFAULT_COSMOS_METHODS);
    case "solana":
      return Object.values(DEFAULT_SOLANA_METHODS);
    case "polkadot":
      return Object.values(DEFAULT_POLKADOT_METHODS);
    default:
      throw new Error(`No default methods for namespace: ${namespace}`);
  }
};

export const getSupportedEventsByNamespace = (namespace) => {
  switch (namespace) {
    case "eip155":
      return Object.values(DEFAULT_EIP_155_EVENTS);
    case "cosmos":
      return Object.values(DEFAULT_COSMOS_EVENTS);
    case "solana":
      return Object.values(DEFAULT_SOLANA_EVENTS);
    case "polkadot":
      return Object.values(DEFAULT_POLKADOT_EVENTS);
    default:
      throw new Error(`No default events for namespace: ${namespace}`);
  }
};

export const getRequiredNamespaces = (
  chains: string[]
): ProposalTypes.RequiredNamespaces => {
  const selectedNamespaces = getNamespacesFromChains(chains);
  console.log("selected namespaces:", selectedNamespaces);

  return Object.fromEntries(
    selectedNamespaces.map((namespace) => [
      namespace,
      {
        methods: getSupportedMethodsByNamespace(namespace),
        chains: chains.filter((chain) => chain.startsWith(namespace)),
        events: getSupportedEventsByNamespace(namespace) as any[],
      },
    ])
  );
};

