'use client'

import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useEffect, useRef } from "react";

const SandpackPreviewClient = () => {
  const previewRef = useRef<SandpackPreviewRef>(null);
  const { sandpack } = useSandpack();

  useEffect(() => {
    getSandpackClient();
  }, [sandpack]);
  
  const getSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    const clientId = previewRef.current?.clientId;
    
    if (client && clientId) {
      console.log(client);
      //return await client.getCodeSandboxURL();
    }

  };

  return (
    <SandpackPreview
      ref={previewRef}
      showNavigator
      style={{ height: "80vh", width: "100%" }}
    />
  );
};

export default SandpackPreviewClient;
