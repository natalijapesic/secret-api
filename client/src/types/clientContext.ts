import { createContext } from "react";
import { SecretNetworkClient } from "secretjs";

export interface ClientContext {
  client: null | SecretNetworkClient;
}

export const ClientContext = createContext<ClientContext>({
  client: null,
});
