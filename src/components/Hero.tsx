"use client";

import React, { useContext } from "react";
import Lookup from "@/data/Lookup";
import Colors from "@/data/Colors";
import { ArrowRight, Link } from "lucide-react";
import { MessagesContext } from "@/context/MessagesContext";

const Hero = () => {
  const [userInput, setUserInput] = React.useState("");
  const { setMessage} = useContext(MessagesContext);

  const onGenerate = (input: string) => {
    setMessage({
      role: 'user',
      content: input,
    })
  }

  return (
    <div className='flex flex-col items-center gap-2 mt-36 lg:mt-52'>
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
    </div>
  );
};

export default Hero;
