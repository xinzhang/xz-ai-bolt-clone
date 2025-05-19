'use client'

import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useConvex } from 'convex/react';

import { Doc } from "../../convex/_generated/dataModel";
import Link from 'next/link';
import { useSidebar } from './ui/sidebar';

type Workspace = Doc<"workspace">;

const WorkspaceHistory = () => {
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (userDetail?._id) {
      GetAllWorkspaces();
    }
  }, [userDetail]);

  const GetAllWorkspaces = async () => {
    if (!userDetail) return;

    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      userId: userDetail?._id,
    });
    setWorkspaces(result);
  };
  
  return (
    <div>
      {
        workspaces.map((workspace) => (
          <div key={workspace._id}>
            <Link href={`/workspace/${workspace._id}`}>
              <h3 className="text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer" onClick={() => toggleSidebar()}>
                {workspace?.messages[0]?.content}
              </h3>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default WorkspaceHistory