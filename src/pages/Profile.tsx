import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import AchievementDisplay from '../components/AchievementDisplay';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    bio: '商务数据分析爱好者，正在学习Python数据分析',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait&image_size=square'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...userInfo });
  
  const learningProgress = [
    { course: 'Python数据分析基础', progress: 75, lastAccessed: '2024-01-15' },
    { course: '机器学习入门', progress: 45, lastAccessed: '2024-01-14' },
    { course: '数据可视化实战', progress: 90, lastAccessed: '2024-01-12' }
  ];
  
  const achievements = [
    { name: '初学者', description: '完成第一个课程', date: '2024-01-01' },
    { name: '数据分析师', description: '完成5个数据分析课程', date: '2024-01-10' },
    { name: '连续学习', description: '连续学习7天', date: '2024-01-14' }
  ];

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-indigo-600">数据分析学习平台</a>
            </div>
            <div className="flex items-center">
              <a href="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">个人资料</a>
              <a href="/courses" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">课程</a>
              <a href="/community" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">社区</a>
              <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">退出登录</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧个人信息 */}
          <div className="lg:w-1/3">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img src={userInfo.avatar} alt="用户头像" className="w-full h-full object-cover" />
                </div>
                {isEditing ? (
                  <div className="w-full">
                    <Input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="mb-2"
                      placeholder="姓名"
                    />
                    <Input
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="mb-2"
                      placeholder="邮箱"
                    />
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                      placeholder="个人简介"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1">保存</Button>
                      <Button onClick={() => setIsEditing(false)} className="flex-1">取消</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-2xl font-bold text-center">{userInfo.name}</CardTitle>
                    <CardDescription className="text-center mb-4">{userInfo.email}</CardDescription>
                    <p className="text-gray-600 text-center mb-4">{userInfo.bio}</p>
                    <Button onClick={() => setIsEditing(true)}>编辑资料</Button>
                  </>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">已学习课程</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">学习时长</span>
                    <span className="font-medium">48小时</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">获得成就</span>
                    <span className="font-medium">{achievements.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">社区贡献</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧学习进度和成就 */}
          <div className="lg:w-2/3 space-y-8">
            {/* 学习进度 */}
            <Card>
              <CardHeader>
                <CardTitle>学习进度</CardTitle>
                <CardDescription>最近学习的课程</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningProgress.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.course}</span>
                        <span className="text-sm text-gray-500">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        最后访问: {item.lastAccessed}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">查看全部课程</Button>
              </CardFooter>
            </Card>

            {/* 成就 */}
            <Card>
              <CardHeader>
                <CardTitle>我的成就</CardTitle>
                <CardDescription>获得的徽章和荣誉</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-gray-500">{achievement.description}</p>
                        <p className="text-xs text-gray-400">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 学习统计 */}
            <Card>
              <CardHeader>
                <CardTitle>学习统计</CardTitle>
                <CardDescription>最近30天的学习情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">学习统计图表</p>
                </div>
              </CardContent>
            </Card>

            {/* 成就系统 */}
            <Card>
              <CardHeader>
                <CardTitle>我的成就</CardTitle>
                <CardDescription>获得的徽章和荣誉</CardDescription>
              </CardHeader>
              <CardContent>
                <AchievementDisplay />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© 2024 数据分析学习平台. 保留所有权利.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600">关于我们</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">服务条款</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">隐私政策</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;