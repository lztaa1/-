import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import VocabularyMemory from '../components/interactive-learning/VocabularyMemory';
import GrammarPractice from '../components/interactive-learning/GrammarPractice';
import SpeakingPractice from '../components/interactive-learning/SpeakingPractice';
import ListeningTraining from '../components/interactive-learning/ListeningTraining';

type LearningModule = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

const InteractiveLearning: React.FC = () => {
  const [activeModule, setActiveModule] = useState<LearningModule>('vocabulary');

  const renderModule = () => {
    switch (activeModule) {
      case 'vocabulary':
        return <VocabularyMemory />;
      case 'grammar':
        return <GrammarPractice />;
      case 'speaking':
        return <SpeakingPractice />;
      case 'listening':
        return <ListeningTraining />;
      default:
        return <VocabularyMemory />;
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
              <a href="/community" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">社区</a>
              <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">退出登录</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">互动学习</h1>
          <p className="text-gray-600">选择以下学习模块开始你的学习之旅</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              className={activeModule === 'vocabulary' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} 
              onClick={() => setActiveModule('vocabulary')}
            >
              单词记忆
            </Button>
            <Button 
              className={activeModule === 'grammar' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} 
              onClick={() => setActiveModule('grammar')}
            >
              语法练习
            </Button>
            <Button 
              className={activeModule === 'speaking' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} 
              onClick={() => setActiveModule('speaking')}
            >
              口语跟读
            </Button>
            <Button 
              className={activeModule === 'listening' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 hover:bg-gray-50'} 
              onClick={() => setActiveModule('listening')}
            >
              听力训练
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {renderModule()}
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

export default InteractiveLearning;