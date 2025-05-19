import ChatView from '@/components/ChatView'
import CodeView from '@/components/CodeView'
import React from 'react'

const Workspace = () => {
  return (
    <div className="px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChatView />
        <div className="col-span-2">
          <CodeView />
        </div>        
      </div>
    </div>
  )
}

export default Workspace