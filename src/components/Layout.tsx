import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store';
import { Menu, X, User, LogOut, BookOpen, Users, Home, Search } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-[#1a365d] text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* 品牌标识 */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <Link to="/" className="text-xl font-bold">数据学习平台</Link>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`flex items-center space-x-1 ${location.pathname === '/' ? 'text-[#ed8936] font-medium' : 'hover:text-gray-300'}`}>
              <Home className="h-4 w-4" />
              <span>首页</span>
            </Link>
            <Link to="/courses" className={`flex items-center space-x-1 ${location.pathname.startsWith('/courses') ? 'text-[#ed8936] font-medium' : 'hover:text-gray-300'}`}>
              <BookOpen className="h-4 w-4" />
              <span>课程</span>
            </Link>
            <Link to="/community" className={`flex items-center space-x-1 ${location.pathname.startsWith('/community') ? 'text-[#ed8936] font-medium' : 'hover:text-gray-300'}`}>
              <Users className="h-4 w-4" />
              <span>社区</span>
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">登录</Link>
                <Link to="/register" className="px-3 py-1 rounded-md bg-[#ed8936] hover:bg-orange-600 transition-colors">注册</Link>
              </div>
            )}
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#2d3748] py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link to="/" className={`py-2 px-4 rounded-md ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
                首页
              </Link>
              <Link to="/courses" className={`py-2 px-4 rounded-md ${location.pathname.startsWith('/courses') ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
                课程
              </Link>
              <Link to="/community" className={`py-2 px-4 rounded-md ${location.pathname.startsWith('/community') ? 'bg-blue-700' : 'hover:bg-blue-800'}`}>
                社区
              </Link>
              {user ? (
                <>
                  <Link to="/profile" className="py-2 px-4 rounded-md hover:bg-blue-800">
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 px-4 rounded-md hover:bg-blue-800"
                  >
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-2 px-4 rounded-md hover:bg-blue-800">
                    登录
                  </Link>
                  <Link to="/register" className="py-2 px-4 rounded-md bg-[#ed8936] hover:bg-orange-600">
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 主内容区 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="bg-[#1a365d] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">数据学习平台</h3>
              <p className="text-gray-300 text-sm">
                提供专业的商务数据分析课程，帮助您掌握数据技能，提升职场竞争力。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-300 hover:text-white">首页</Link></li>
                <li><Link to="/courses" className="text-gray-300 hover:text-white">课程</Link></li>
                <li><Link to="/community" className="text-gray-300 hover:text-white">社区</Link></li>
                <li><Link to="/profile" className="text-gray-300 hover:text-white">个人中心</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>邮箱: contact@datalearning.com</li>
                <li>电话: 400-123-4567</li>
                <li>地址: 北京市海淀区中关村</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">关注我们</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">微信</a>
                <a href="#" className="text-gray-300 hover:text-white">微博</a>
                <a href="#" className="text-gray-300 hover:text-white">知乎</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 数据学习平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
