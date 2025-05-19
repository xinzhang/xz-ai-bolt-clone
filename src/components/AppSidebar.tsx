'use client'

import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from './ui/button'
import { MessageCircleIcon } from 'lucide-react'
import WorkspaceHistory from './WorkspaceHistory'
import Footer from './Footer'
import { useSidebar } from './ui/sidebar'

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className='p-5'>
        <Image onClick={() => toggleSidebar()} src={'/logo.png'} alt='logo' width={30} height={30} />
        <Button className='mt-5'><MessageCircleIcon className='w-4 h-4 mr-2' /> Start new chat</Button>
      </SidebarHeader>
      <SidebarContent className='p-5'>        
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar