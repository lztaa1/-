import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

const Community: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '如何高效学习Python数据分析？',
      content: '我是数据分析新手，想学习Python数据分析，有什么推荐的学习路径吗？',
      author: '李四',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square',
      date: '2024-01-15',
      likes: 24,
      comments: 8,
      category: '学习路径'
    },
    {
      id: 2,
      title: '分享一个实用的数据分析项目',
      content: '最近完成了一个电商用户行为分析项目，使用了Python和Tableau，效果不错。',
      author: '王五',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20female&image_size=square',
      date: '2024-01-14',
      likes: 18,
      comments: 12,
      category: '项目分享'
    },
    {
      id: 3,
      title: '关于Pandas的性能优化',
      content: '处理大规模数据时，Pandas的性能问题很明显，有什么优化技巧吗？',
      author: '赵六',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square',
      date: '2024-01-13',
      likes: 32,
      comments: 15,
      category: '技术讨论'
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '学习路径'
  });
  
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, string[]>>({
    1: [
      '推荐先学习Python基础，然后学习NumPy和Pandas，最后学习Matplotlib和Scikit-learn。',
      '可以从《Python数据分析》这本书开始，配合实战项目学习。'
    ],
    2: [
      '能分享一下项目的具体内容吗？',
      'Tableau的可视化效果确实很棒，我也在学习。'
    ],
    3: [
      '可以使用Dask来处理大规模数据，它是Pandas的并行版本。',
      '尝试使用向量化操作，避免使用for循环。',
      '考虑使用PySpark处理超大规模数据。'
    ]
  });
  
  const [newComment, setNewComment] = useState('');

  const categories = ['学习路径', '项目分享', '技术讨论', '求职经验', '其他'];

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: '当前用户',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait&image_size=square',
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        category: newPost.category
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', category: '学习路径' });
      setShowNewPostForm(false);
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (newComment) {
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      ));
      setNewComment('');
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">社区交流</h1>
          <Button onClick={() => setShowNewPostForm(!showNewPostForm)}>
            {showNewPostForm ? '取消' : '发布新帖子'}
          </Button>
        </div>

        {/* 发布新帖子表单 */}
        {showNewPostForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>发布新帖子</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">标题</label>
                  <Input
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleNewPostChange}
                    placeholder="请输入帖子标题"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">分类</label>
                  <select
                    id="category"
                    name="category"
                    value={newPost.category}
                    onChange={handleNewPostChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">内容</label>
                  <textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleNewPostChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="请输入帖子内容"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreatePost} className="w-full">发布帖子</Button>
            </CardFooter>
          </Card>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧帖子列表 */}
          <div className="lg:w-2/3 space-y-6">
            {posts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{post.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <div className="flex space-x-4">
                    <button 
                      className="flex items-center text-gray-500 hover:text-indigo-600"
                      onClick={() => handleLike(post.id)}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </button>
                    <button 
                      className="flex items-center text-gray-500 hover:text-indigo-600"
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </button>
                  </div>
                </CardFooter>
                
                {/* 评论区 */}
                {selectedPost === post.id && (
                  <div className="p-4 border-t bg-gray-50">
                    <h4 className="font-medium mb-3">评论</h4>
                    <div className="space-y-3 mb-4">
                      {(comments[post.id] || []).map((comment, index) => (
                        <div key={index} className="bg-white p-3 rounded-md">
                          <p className="text-gray-700">{comment}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="写下你的评论..."
                        className="flex-1"
                      />
                      <Button onClick={() => handleAddComment(post.id)}>发送</Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* 右侧边栏 */}
          <div className="lg:w-1/3 space-y-6">
            {/* 热门话题 */}
            <Card>
              <CardHeader>
                <CardTitle>热门话题</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">#Python数据分析</a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">#机器学习入门</a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">#数据可视化</a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">#求职经验分享</a>
                  </li>
                  <li>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">#项目实战</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 活跃用户 */}
            <Card>
              <CardHeader>
                <CardTitle>活跃用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: '李四', posts: 12, avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square' },
                    { name: '王五', posts: 9, avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20female&image_size=square' },
                    { name: '赵六', posts: 7, avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20male&image_size=square' }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.posts} 篇帖子</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 社区规则 */}
            <Card>
              <CardHeader>
                <CardTitle>社区规则</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 尊重他人，友善交流</li>
                  <li>• 分享有价值的内容</li>
                  <li>• 不发布广告和垃圾信息</li>
                  <li>• 保护个人隐私</li>
                  <li>• 遵守相关法律法规</li>
                </ul>
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

export default Community;