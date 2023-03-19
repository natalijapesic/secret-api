import secretjsService from "@/services/secretjs.service";
import { ClientContext } from "@/types/clientContext";
import { FC, ReactNode, useEffect, useState } from "react";
import { SecretNetworkClient } from "secretjs";
export type ClientProps = {
  children?: ReactNode;
};

export const ClientProvider: FC<ClientProps> = ({ children }) => {
  const [client, setClient] = useState<null | SecretNetworkClient>(null);
  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    const response = await secretjsService.initializeClient();
    setClient(response);
  };
  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
};
