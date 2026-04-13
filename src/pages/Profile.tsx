import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore, useAchievementStore } from '../store';
import { User, Award, BookOpen, Settings, BarChart3, FileText, ChevronRight } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Profile: React.FC = () => {
  const { user, loading: userLoading, logout } = useUserStore();
  const { achievements, certificates, fetchAchievements, fetchCertificates, loading: achievementLoading } = useAchievementStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchAchievements();
      fetchCertificates();
    }
  }, [user, fetchAchievements, fetchCertificates]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // 技能雷达图数据
  const skillsData = {
    labels: ['数据分析', 'SQL', 'Python', '数据可视化', '机器学习', '商业智能'],
    datasets: [
      {
        label: '技能水平',
        data: [85, 70, 65, 80, 50, 75],
        backgroundColor: 'rgba(49, 130, 206, 0.2)',
        borderColor: 'rgba(49, 130, 206, 1)',
        pointBackgroundColor: 'rgba(49, 130, 206, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(49, 130, 206, 1)'
      }
    ]
  };

  if (userLoading || !user) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  学习时长: 48 小时
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  完成课程: 3 门
                </span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  成就: {achievements.length}
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>

        {/* 学习统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-semibold">学习进度</h3>
            </div>
            <div className="text-3xl font-bold mb-2">68%</div>
            <p className="text-gray-600">已完成 17/25 课时</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="font-semibold">成就等级</h3>
            </div>
            <div className="text-3xl font-bold mb-2">Lv. 3</div>
            <p className="text-gray-600">数据分析师</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-semibold">获得证书</h3>
            </div>
            <div className="text-3xl font-bold mb-2">{certificates.length}</div>
            <p className="text-gray-600">专业认证</p>
          </div>
        </div>

        {/* 技能图谱 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">技能图谱</h2>
          <div className="h-64">
            <Radar data={skillsData} />
          </div>
        </div>

        {/* 学习档案 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">学习档案</h2>
            <Link to="#" className="text-blue-600 hover:underline flex items-center">
              查看全部 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {/* 最近学习的课程 */}
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">商务数据分析基础</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">已完成 6/6 章节</p>
                </div>
                <Link to="/courses/1" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors">
                  查看课程
                </Link>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">SQL 数据分析实战</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">已完成 2/5 章节</p>
                </div>
                <Link to="/courses/2" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors">
                  继续学习
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 成就系统 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">成就系统</h2>
            <Link to="#" className="text-blue-600 hover:underline flex items-center">
              查看全部 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {achievements.length > 0 ? (
              achievements.slice(0, 4).map(achievement => (
                <div key={achievement.id} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-500">{achievement.unlocked_at.substring(0, 10)}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">暂无成就</p>
              </div>
            )}
          </div>
        </div>

        {/* 获得的证书 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">获得的证书</h2>
            <Link to="#" className="text-blue-600 hover:underline flex items-center">
              查看全部 <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {certificates.length > 0 ? (
              certificates.map(certificate => (
                <div key={certificate.id} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mr-4">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{certificate.course?.title || '课程证书'}</h3>
                      <p className="text-sm text-gray-500 mt-1">颁发日期: {certificate.issued_at.substring(0, 10)}</p>
                    </div>
                    <a
                      href={certificate.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      查看证书
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">暂无证书</p>
              </div>
            )}
          </div>
        </div>

        {/* 个性化推荐 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">个性化推荐</h2>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">Python 数据科学入门</h3>
                  <p className="text-sm text-gray-500 mt-1">基于您的学习历史推荐</p>
                </div>
                <Link to="/courses/3" className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  查看课程
                </Link>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-md flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">商业智能与数据可视化</h3>
                  <p className="text-sm text-gray-500 mt-1">基于您的技能水平推荐</p>
                </div>
                <Link to="/courses/4" className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                  查看课程
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
