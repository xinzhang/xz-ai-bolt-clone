"use client";

import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { Id } from "../../convex/_generated/dataModel";
import Markdown from "react-markdown";
import { useSidebar } from "./ui/sidebar";

export const countTokens = (inputText: string) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
};

const ChatView = () => {
  const params = useParams();
  const id = params.id as Id<"workspace">;
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateTokens = useMutation(api.users.UpdateTokens)

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
    setLoading(true);
    const prompt = [
      ...messages,
      {
        role: "system",
        content: Prompt.CHAT_PROMPT,
      },
    ];

    const result = await axios.post("/api/ai-chat", {
      prompt: prompt,
    });
    const aiResponse = {
      role: "ai",
      content: result.data.result,
    };

    setMessages((prev) => [...prev, aiResponse]);
    await UpdateMessages({
      workspaceId: id,
      messages: [...messages, aiResponse],
    });

    const tokenCount = countTokens(aiResponse.content);
    if (userDetail && userDetail?._id) {
      const newToken = userDetail.token - tokenCount;
      setUserDetail((prev) => ({ ...prev, token: newToken} as UserDetail));

      await UpdateTokens({
        userId: userDetail?._id,
        token: userDetail?.token - tokenCount,
      });
    }
    setLoading(false);
  };

  const onGenerate = async (input: string) => {
    const msg = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, msg]);
    setUserInput("");
  };

  return (
    <div className='relative h-[85vh] flex flex-col kk'>
      <div className='flex-1 overflow-y-scroll px-5 py-2'>
        {messages?.map((message, index) => (
          <div
            key={index}
            className='p-3 rounded-lg mb-2 flex gap-2 items-center justify-start leading-7'
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
      {loading && (
        <div className='flex gap-2 items-center p-3 rounded-lg mb-2'>
          <Loader2Icon className='w-4 h-4 animate-spin' />
          <h2>Thinking...</h2>
        </div>
      )}

      {/* input section */}
      <div className='flex items-end gap-2'>
        {userDetail && <Image
          className='rounded-full cursor-pointer'
          src={userDetail?.picture || ""}
          alt='user'
          width={30}
          height={30}
          onClick={() => toggleSidebar()}
        />}

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
                className='bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer'
              />
            )}
          </div>
          <div>
            <Link className='font-medium h-5 w-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
