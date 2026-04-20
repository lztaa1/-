import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Vocabulary {
  id: number;
  word: string;
  meaning: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const vocabularyList: Vocabulary[] = [
  {
    id: 1,
    word: 'Data Analysis',
    meaning: '数据分析',
    example: 'Data analysis helps businesses make informed decisions.',
    difficulty: 'easy'
  },
  {
    id: 2,
    word: 'Machine Learning',
    meaning: '机器学习',
    example: 'Machine learning algorithms can predict customer behavior.',
    difficulty: 'medium'
  },
  {
    id: 3,
    word: 'Regression',
    meaning: '回归分析',
    example: 'Linear regression is used to predict numerical values.',
    difficulty: 'medium'
  },
  {
    id: 4,
    word: 'Clustering',
    meaning: '聚类',
    example: 'K-means clustering helps identify patterns in data.',
    difficulty: 'medium'
  },
  {
    id: 5,
    word: 'Neural Network',
    meaning: '神经网络',
    example: 'Neural networks are used in deep learning applications.',
    difficulty: 'hard'
  }
];

const VocabularyMemory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredVocabulary, setFilteredVocabulary] = useState<Vocabulary[]>(vocabularyList);

  useEffect(() => {
    if (difficultyFilter === 'all') {
      setFilteredVocabulary(vocabularyList);
    } else {
      setFilteredVocabulary(vocabularyList.filter(vocab => vocab.difficulty === difficultyFilter));
    }
    setCurrentIndex(0);
    setShowMeaning(false);
    setShowExample(false);
  }, [difficultyFilter]);

  const currentVocab = filteredVocabulary[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVocabulary.length);
    setShowMeaning(false);
    setShowExample(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVocabulary.length) % filteredVocabulary.length);
    setShowMeaning(false);
    setShowExample(false);
  };

  const handleKnow = () => {
    setCorrectCount(prev => prev + 1);
    setTotalCount(prev => prev + 1);
    handleNext();
  };

  const handleDontKnow = () => {
    setTotalCount(prev => prev + 1);
    handleNext();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">单词记忆</h2>
        <div className="flex space-x-2">
          <Button 
            className={`${difficultyFilter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDifficultyFilter('all')}
          >
            全部
          </Button>
          <Button 
            className={`${difficultyFilter === 'easy' ? 'bg-green-100 text-green-800' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDifficultyFilter('easy')}
          >
            简单
          </Button>
          <Button 
            className={`${difficultyFilter === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDifficultyFilter('medium')}
          >
            中等
          </Button>
          <Button 
            className={`${difficultyFilter === 'hard' ? 'bg-red-100 text-red-800' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDifficultyFilter('hard')}
          >
            困难
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{currentVocab.word}</CardTitle>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentVocab.difficulty)}`}>
            {currentVocab.difficulty === 'easy' ? '简单' : currentVocab.difficulty === 'medium' ? '中等' : '困难'}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">含义</h3>
              {showMeaning ? (
                <p className="text-lg">{currentVocab.meaning}</p>
              ) : (
                <Button onClick={() => setShowMeaning(true)} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">显示含义</Button>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">例句</h3>
              {showExample ? (
                <p className="text-lg">{currentVocab.example}</p>
              ) : (
                <Button onClick={() => setShowExample(true)} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">显示例句</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            进度: {currentIndex + 1} / {filteredVocabulary.length}
          </p>
          <p className="text-sm text-gray-600">
            正确率: {totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0}%
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePrevious} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">上一个</Button>
          <Button onClick={handleDontKnow} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">不认识</Button>
          <Button onClick={handleKnow} className="bg-green-600 hover:bg-green-700">认识</Button>
          <Button onClick={handleNext} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">下一个</Button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">单词列表</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocabulary.map((vocab) => (
            <Card key={vocab.id} className={currentIndex === filteredVocabulary.indexOf(vocab) ? 'border-indigo-500' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{vocab.word}</h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(vocab.difficulty)}`}>
                    {vocab.difficulty === 'easy' ? '简单' : vocab.difficulty === 'medium' ? '中等' : '困难'}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{vocab.meaning}</p>
                <p className="text-sm text-gray-500 mt-2">{vocab.example}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyMemory;