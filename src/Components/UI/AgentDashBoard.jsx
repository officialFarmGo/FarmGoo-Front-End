import React from 'react'
import AgentDashBoardHeader from '../AgentDashBoardHeader'
import AgentQuickActions from '../AgentQuickActions'
import AgentRecentActivity from '../AgentRecentActivity'




const AgentDashBoard = () => {
  return (
    <div>

    <AgentDashBoardHeader />
    <AgentQuickActions />
    <AgentRecentActivity />
    </div>
  )
}

export default AgentDashBoard
