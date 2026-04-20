import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: '李四',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square'
      },
      title: 'Python数据分析中最常用的库有哪些？',
      content: '我刚刚开始学习数据分析，想了解一下Python中最常用的数据分析库有哪些，以及它们各自的特点和使用场景。',
      timestamp: '2024-01-15 10:30',
      likes: 24,
      comments: 8,
      tags: ['Python', '数据分析', '库推荐']
    },
    {
      id: 2,
      author: {
        name: '王五',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20female&image_size=square'
      },
      title: '如何提高数据可视化的效果？',
      content: '我在做数据可视化时，总是感觉图表不够美观，请问有什么技巧可以提高数据可视化的效果？',
      timestamp: '2024-01-14 15:45',
      likes: 18,
      comments: 12,
      tags: ['数据可视化', '技巧', '图表设计']
    },
    {
      id: 3,
      author: {
        name: '赵六',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square'
      },
      title: '机器学习入门推荐课程',
      content: '想入门机器学习，有什么推荐的课程或资源吗？最好是适合初学者的。',
      timestamp: '2024-01-13 09:20',
      likes: 32,
      comments: 15,
      tags: ['机器学习', '入门', '课程推荐']
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: ''
  });
  
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const post: Post = {
        id: posts.length + 1,
        author: {
          name: '张三',
          avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait&image_size=square'
        },
        title: newPost.title,
        content: newPost.content,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: 0,
        tags
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', tags: '' });
      setIsCreatingPost(false);
    }
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
              <a href="/community" className="text-indigo-600 border-b-2 border-indigo-600 px-3 py-2 rounded-md text-sm font-medium">社区</a>
              <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">退出登录</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧边栏 */}
          <div className="lg:w-1/4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>社区分类</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><a href="#" className="text-indigo-600 font-medium">全部讨论</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-indigo-600">Python数据分析</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-indigo-600">机器学习</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-indigo-600">数据可视化</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-indigo-600">求职就业</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-indigo-600">学习资源</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>活跃用户</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square" alt="用户头像" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">李四</p>
                      <p className="text-xs text-gray-500">发布了 24 个帖子</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20female&image_size=square" alt="用户头像" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">王五</p>
                      <p className="text-xs text-gray-500">发布了 18 个帖子</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square" alt="用户头像" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">赵六</p>
                      <p className="text-xs text-gray-500">发布了 15 个帖子</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 右侧主内容 */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <Button 
                onClick={() => setIsCreatingPost(!isCreatingPost)}
                className="w-full mb-4"
              >
                {isCreatingPost ? '取消' : '发布新帖子'}
              </Button>
              
              {isCreatingPost && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>发布新帖子</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          标题
                        </label>
                        <Input
                          id="title"
                          name="title"
                          value={newPost.title}
                          onChange={handlePostChange}
                          placeholder="请输入帖子标题"
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          内容
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={newPost.content}
                          onChange={handlePostChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          placeholder="请输入帖子内容"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                          标签 (用逗号分隔)
                        </label>
                        <Input
                          id="tags"
                          name="tags"
                          value={newPost.tags}
                          onChange={handlePostChange}
                          placeholder="例如: Python, 数据分析, 学习"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleCreatePost} className="w-full">
                      发布帖子
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {posts.map(post => (
                <Card key={post.id}>
                  <CardHeader className="flex flex-row items-start justify-between">
                    <div className="flex items-center">
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>
                          {post.author.name} · {post.timestamp}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {post.likes}
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-indigo-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.comments}
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-indigo-600">
                      分享
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">上一页</button>
                <button className="px-3 py-1 border border-indigo-600 rounded-md bg-indigo-600 text-white">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">下一页</button>
              </nav>
            </div>
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

export default Community;