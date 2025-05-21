"use client";

import React, { useContext } from "react";
import Lookup from "@/data/Lookup";
import Colors from "@/data/Colors";
import { ArrowRight, Link } from "lucide-react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const Hero = () => {
  const [userInput, setUserInput] = React.useState("");
  const { setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail} = useContext(UserDetailContext);
  const [ openDialog, setOpenDialog ] = React.useState(false);
  const createWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    if (userDetail.token < 10) {
      toast.error("You don't have enough tokens");
      return;
    }
    
    const msg = {
      role: 'user',
      content: input,
    }

    setMessages([msg])

    const workspaceId = await createWorkspace({
      user: userDetail._id,
      messages: [msg],
    });

    router.push(`/workspace/${workspaceId}`);
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <h2 className='font-bold text-2xl text-gray-100'>
        {Lookup.HERO_HEADING}
      </h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>

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

      <div className='flex flex-wrap gap-3 max-w-2xl justify-center'>
        {Lookup?.SUGGESTIONS?.map((suggestion, index) => (
          <h2
            onClick={() => setUserInput(suggestion)}
            className='p-2 px-3 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer'
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={()=>setOpenDialog(false)}/>
    </div>
  );
};

export default Hero;
