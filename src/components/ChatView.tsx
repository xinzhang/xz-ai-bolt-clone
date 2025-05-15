"use client";

import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { Id } from "../../convex/_generated/dataModel"; 

const ChatView = () => {
  const params = useParams();
  const id = params.id as Id<"workspace">;
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = React.useState("");

  useEffect(() => {
    if (id) {
      GetWorkspaceData();
    }
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        getAiResponse();
      }
    }
  }, [messages]);


  const GetWorkspaceData = async () => {
    if (!id) return; 

    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  const getAiResponse = async () => {
    const prompt = [...messages, {
        role: "system",
        content: Prompt.CHAT_PROMPT,
      }];
      
    const result = await axios.post("/api/ai-chat", {
      prompt: prompt,
    });
    console.log("AI Response:", result.data.result);
  }

  const onGenerate = async (input: string) => {
    const msg = {
      role: 'user',
      content: input,
    }

    setMessages([msg])
    getAiResponse();    
  }

  return (
    <div className='relative h-[85vh] flex flex-col kk'>
      <div className="flex-1 overflow-y-scroll px-5 py-2">
        {messages?.map((message, index) => (
          <div
            key={index}
            className='p-3 rounded-lg mb-2 flex gap-2 items-start'
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            {message?.role === "user" && (
              <Image
                src={userDetail?.picture || "/logo.png"}
                alt='userImage'
                width={32}
                height={32}
                className='rounded-full'
              />
            )}
            <h2>{message.content}</h2>
          </div>
        ))}
      </div>

      {/* input section */}
      <div
        className='px-5 py-2 border rounded-xl max-w-xl w-full mt-3'
        style={{ background: Colors.BACKGROUND }}
      >
        <div className='flex gap-2 mt-4'>
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            className='outline-none bg-transparent w-full h-32 max-h-56 resize-none'
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <ArrowRight 
              onClick={() => {
                onGenerate(userInput);
                setUserInput("");
              }}
              className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer' />
          )}
        </div>
        <div>
          <Link className='font-medium h-5 w-5' />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
