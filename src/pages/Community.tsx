import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { MessageSquare, HelpCircle, Share2 } from 'lucide-react';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">社区</h1>
        
        {/* 社区导航 */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <NavLink
              to="discussions"
              className={({ isActive }) => 
                `flex items-center px-6 py-4 border-b-2 transition-colors ${isActive ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent hover:bg-gray-50'}`
              }
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              讨论区
            </NavLink>
            <NavLink
              to="questions"
              className={({ isActive }) => 
                `flex items-center px-6 py-4 border-b-2 transition-colors ${isActive ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent hover:bg-gray-50'}`
              }
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              问答板块
            </NavLink>
            <NavLink
              to="shares"
              className={({ isActive }) => 
                `flex items-center px-6 py-4 border-b-2 transition-colors ${isActive ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent hover:bg-gray-50'}`
              }
            >
              <Share2 className="h-5 w-5 mr-2" />
              用户分享
            </NavLink>
          </div>
        </div>
        
        {/* 内容区域 */}
        <Outlet />
      </div>
    </div>
  );
};

export default Community;
