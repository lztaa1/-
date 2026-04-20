import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface GrammarQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const grammarQuestions: GrammarQuestion[] = [
  {
    id: 1,
    question: "Which of the following is the correct way to import pandas in Python?",
    options: [
      "import pandas",
      "import pandas as pd",
      "from pandas import *",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All of the options are valid ways to import pandas in Python, but 'import pandas as pd' is the most commonly used convention.",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "What is the output of the following code: print(2 + 3 * 4)",
    options: [
      "20",
      "14",
      "25",
      "11"
    ],
    correctAnswer: 1,
    explanation: "According to operator precedence in Python, multiplication is performed before addition. So 3 * 4 = 12, then 2 + 12 = 14.",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "Which method is used to create a DataFrame in pandas?",
    options: [
      "pandas.DataFrame()",
      "pandas.create_dataframe()",
      "pandas.make_dataframe()",
      "pandas.new_dataframe()"
    ],
    correctAnswer: 0,
    explanation: "The correct method to create a DataFrame in pandas is pandas.DataFrame().",
    difficulty: 'medium'
  },
  {
    id: 4,
    question: "What does the 'groupby' function do in pandas?",
    options: [
      "Groups data by a column and applies a function to each group",
      "Sorts data by a column",
      "Filters data based on a condition",
      "None of the above"
    ],
    correctAnswer: 0,
    explanation: "The groupby function in pandas is used to group data by one or more columns and then apply a function (like sum, mean, etc.) to each group.",
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "Which of the following is not a machine learning algorithm?",
    options: [
      "Linear Regression",
      "K-Means Clustering",
      "Principal Component Analysis (PCA)",
      "All of the above are machine learning algorithms"
    ],
    correctAnswer: 3,
    explanation: "All of the options are machine learning algorithms. Linear Regression is a supervised learning algorithm, K-Means Clustering is an unsupervised learning algorithm, and PCA is a dimensionality reduction technique often used in machine learning.",
    difficulty: 'hard'
  }
];

const GrammarPractice: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredQuestions, setFilteredQuestions] = useState<GrammarQuestion[]>(grammarQuestions);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestion.id));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOptionColor = (index: number) => {
    if (!showResult) return '';
    if (index === currentQuestion.correctAnswer) return 'bg-green-100 border-green-500';
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) return 'bg-red-100 border-red-500';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">语法练习</h2>
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
          <CardTitle className="text-xl">
            问题 {currentQuestionIndex + 1} / {filteredQuestions.length}
          </CardTitle>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty === 'easy' ? '简单' : currentQuestion.difficulty === 'medium' ? '中等' : '困难'}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
            
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-3 border rounded-md ${getOptionColor(index)} hover:bg-gray-50`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
            
            {showResult && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">解析:</h3>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            得分: {score} / {answeredQuestions.size}
          </p>
          <p className="text-sm text-gray-600">
            正确率: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePreviousQuestion} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">上一题</Button>
          <Button onClick={handleNextQuestion} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">下一题</Button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">问题列表</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((question) => (
            <Card 
              key={question.id} 
              className={`${currentQuestionIndex === filteredQuestions.indexOf(question) ? 'border-indigo-500' : ''} ${answeredQuestions.has(question.id) ? 'opacity-75' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{question.question.substring(0, 50)}...</h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
                  </div>
                </div>
                {answeredQuestions.has(question.id) && (
                  <div className="mt-2 text-xs text-gray-500">
                    已回答
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrammarPractice;