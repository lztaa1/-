import React, { useEffect, useState } from 'react';
import { useCommunityStore, useUserStore } from '../../store';
import { HelpCircle, User, Calendar, Eye, MessageCircle, CheckCircle } from 'lucide-react';

const QuestionList: React.FC = () => {
  const { questions, fetchQuestions, createQuestion, loading } = useCommunityStore();
  const { user } = useUserStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      await createQuestion(title, content, tagArray);
      setTitle('');
      setContent('');
      setTags('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 创建问题按钮 */}
      {user && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            {showCreateForm ? '取消' : '提出问题'}
          </button>

          {/* 创建问题表单 */}
          {showCreateForm && (
            <form onSubmit={handleCreateQuestion} className="mt-4 space-y-4">
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
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  标签（用逗号分隔）
                </label>
                <input
                  type="text"
                  id="tags"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="例如：数据分析, SQL, Python"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  问题描述
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
                发布问题
              </button>
            </form>
          )}
        </div>
      )}

      {/* 问题列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">热门问题</h2>
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
          ) : questions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无问题</h3>
              <p className="text-gray-500">成为第一个提出问题的人吧！</p>
            </div>
          ) : (
            questions.map(question => (
              <div key={question.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start mb-2">
                  {question.is_solved && (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <h3 className="font-medium flex-grow line-clamp-2">
                    {question.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {question.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{question.user?.name || '匿名用户'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{question.created_at.substring(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{question.view_count}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{question.answer_count}</span>
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

export default QuestionList;
