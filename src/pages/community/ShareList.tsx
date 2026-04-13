import React, { useEffect, useState } from 'react';
import { useCommunityStore, useUserStore } from '../../store';
import { Share2, User, Calendar, Heart, MessageCircle, Image } from 'lucide-react';

const ShareList: React.FC = () => {
  const { shares, fetchShares, createShare, loading } = useCommunityStore();
  const { user } = useUserStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  useEffect(() => {
    fetchShares();
  }, [fetchShares]);

  const handleCreateShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      await createShare(title, content, mediaUrl);
      setTitle('');
      setContent('');
      setMediaUrl('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 创建分享按钮 */}
      {user && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Share2 className="h-5 w-5 mr-2" />
            {showCreateForm ? '取消' : '发布分享'}
          </button>

          {/* 创建分享表单 */}
          {showCreateForm && (
            <form onSubmit={handleCreateShare} className="mt-4 space-y-4">
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
              <div>
                <label htmlFor="mediaUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  图片链接（可选）
                </label>
                <input
                  type="text"
                  id="mediaUrl"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="输入图片 URL"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                发布分享
              </button>
            </form>
          )}
        </div>
      )}

      {/* 分享列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">用户分享</h2>
        </div>
        <div className="divide-y">
          {loading ? (
            // 加载状态
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="px-6 py-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
                <div className="h-40 bg-gray-200 rounded mb-3"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))
          ) : shares.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Share2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">暂无分享</h3>
              <p className="text-gray-500">成为第一个分享的人吧！</p>
            </div>
          ) : (
            shares.map(share => (
              <div key={share.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <h3 className="font-medium mb-2">
                  {share.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {share.content}
                </p>
                {share.media_url && (
                  <div className="mb-4">
                    <img
                      src={share.media_url}
                      alt={share.title}
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{share.user?.name || '匿名用户'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{share.created_at.substring(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{share.like_count}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{share.comment_count}</span>
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

export default ShareList;
