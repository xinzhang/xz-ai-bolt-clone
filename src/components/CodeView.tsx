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
import { useConvex, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
import { Loader2Icon } from "lucide-react";
import SandpackPreviewClient from "./SandpackPreviewClient";

const CodeView = () => {
  const params = useParams();
  const id = params.id as Id<"workspace">;
  const convex = useConvex();

  const [activeTab, setActiveTab] = React.useState("code");
  const [files, setFiles] = React.useState<any>(Lookup.DEFAULT_FILE);

  const [loading, setLoading] = React.useState(false);

  const {messages, setMessages} = useContext(MessagesContext)
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);

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

  useEffect(() => {
    if (id) {
      GetFiles();
    }
  }, [id]);

  const GetFiles = async () => {
    if (!id) return;

    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };  
    setFiles(mergedFiles);
  };

  const genAiCode = async () => {    
    setLoading(true);
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
    setFiles(mergedFiles);
    UpdateFiles({
      workspaceId: id,
      files: aiResponse?.files,
    });
    setLoading(false);
  };

  return (
    <div className='bg-[#181818] w-full p-2 border relative'>
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
              <SandpackPreviewClient />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className='p-10 bg-gray-900 opacity-75 w-full h-full rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 text-white'>
          <Loader2Icon className='w-10 h-10 animate-spin' />
          <h2>Generating Codes ...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
