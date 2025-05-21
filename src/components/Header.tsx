"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import SignInDialog from "./SignInDialog";
import { useSidebar } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { LucideDownload, Rocket } from "lucide-react";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const { toggleSidebar } = useSidebar();
  const path = usePathname();

  const onExport = () => {

  }
  
  return (
    <div className='p-4 flex justify-between items-center'>
      <Image
        className='cursor-pointer'
        onClick={() => toggleSidebar()}
        src='/logo.png'
        alt='Logo'
        width={40}
        height={40}
      />

      {!userDetail && (
        <div className='flex gap-5'>
          <Button
            className='cursor-pointer'
            variant='ghost'
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
          <Button
            className='text-white'
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
          <SignInDialog
            openDialog={openDialog}
            closeDialog={() => setOpenDialog(false)}
          />
        </div>
      )}

      {path?.includes('workspace') && (
        <div className="flex gap-2 items-center">
          <Button variant='ghost' className="cursor-pointer" onClick={() => onExport()}>
            <LucideDownload className="w-4 h-4" />
             Export
          </Button>
          <Button variant='ghost' className="cursor-pointer">
            <Rocket className="w-4 h-4" />
             Deploy
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
