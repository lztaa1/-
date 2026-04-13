import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCommunityStore, useUserStore } from '../../store';
import { MessageSquare, User, Calendar, Eye, MessageCircle } from 'lucide-react';

const DiscussionList: React.FC = () => {
  const { discussions, fetchDiscussions, createDiscussion, loading } = useCommunityStore();
  const { user } = useUserStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('数据分析');

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && category) {
      await createDiscussion(title, content, category);
      setTitle('');
      setContent('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 创建讨论按钮 */}
      {user && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {showCreateForm ? '取消' : '发布讨论'}
          </button>

          {/* 创建讨论表单 */}
          {showCreateForm && (
            <form onSubmit={handleCreateDiscussion} className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  分类
                </label>
                <select
                  id="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="数据分析">数据分析</option>
                  <option value="SQL">SQL</option>
                  <option value="Python">Python</option>
                  <option value="数据可视化">数据可视化</option>
                  <option value="机器学习">机器学习</option>
                </select>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  id="content"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                发布
              </button>
            </form>
          )}
        </div>
      )}

      {/* 讨论列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">热门讨论</h2>
        </div>
        <div className="divide-y">
          {loading ? (
            // 加载状态
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="px-6 py-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))
          ) : discussions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无讨论</h3>
              <p className="text-gray-500">成为第一个发起讨论的人吧！</p>
            </div>
          ) : (
            discussions.map(discussion => (
              <div key={discussion.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium mb-2 line-clamp-2">
                  {discussion.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {discussion.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{discussion.user?.name || '匿名用户'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{discussion.created_at.substring(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{discussion.view_count}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{discussion.comment_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionList;
