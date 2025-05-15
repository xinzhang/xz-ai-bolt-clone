"use client";

import React, { useContext, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "../data/Lookup";
import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";

const CodeView = () => {
  const [activeTab, setActiveTab] = React.useState("code");
  const [files, setFiles] = React.useState<any>(Lookup.DEFAULT_FILE);

  const {messages, setMessages} = useContext(MessagesContext)

  const activeTabStyle =
    "text-black-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full";
  
    useEffect(() => {
      if (messages?.length > 0) {
        const role = messages[messages.length - 1].role;
        if (role === "user") {
          genAiCode();
        }
      }
    }, [messages]);

  const genAiCode = async () => {    
    const PROMPT = [
      ...messages,
      {
        role: "system",
        content: Prompt.CODE_GEN_PROMPT,
      },
    ];

    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });

    console.log(result.data);
    const aiResponse = result.data;

    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResponse?.files };
    console.log(mergedFiles);
    setFiles(mergedFiles);
  };

  return (
    <div className='bg-[#181818] w-full p-2 border'>
      <div className='flex items-center shrink-0 gap-2 bg-black p-2 w-[160px] justify-center rounded-full'>
        <h2
          className={`round-md text-sm cursor-pointer ${activeTab === "code" ? `${activeTabStyle}` : "text-gray-400"}`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </h2>
        <h2
          className={`round-md text-sm cursor-pointer ${activeTab === "preview" ? `${activeTabStyle}` : "text-gray-400"}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </h2>
      </div>
      <SandpackProvider
        template='react'
        theme={"dark"}
        files={files}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: { ...Lookup.DEPENDANCY },
        }}
      >
        <SandpackLayout>
          {activeTab === "code" && (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          )}
          {activeTab === "preview" && (
            <>
              <SandpackPreview
                showNavigator
                style={{ height: "80vh", width: "100%" }}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
