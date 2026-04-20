import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ListeningExercise {
  id: number;
  title: string;
  audioUrl: string;
  transcript: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const listeningExercises: ListeningExercise[] = [
  {
    id: 1,
    title: "Introduction to Data Analysis",
    audioUrl: "#",
    transcript: "Data analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information, inform conclusions, and support decision-making.",
    questions: [
      {
        question: "What is data analysis?",
        options: [
          "The process of collecting data",
          "The process of inspecting, cleaning, transforming, and modeling data",
          "The process of visualizing data",
          "The process of storing data"
        ],
        correctAnswer: 1
      }
    ],
    difficulty: 'easy'
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    audioUrl: "#",
    transcript: "Machine learning is a subset of artificial intelligence that enables systems to learn from data without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions based on those patterns.",
    questions: [
      {
        question: "What is machine learning?",
        options: [
          "A subset of artificial intelligence",
          "A type of data visualization",
          "A programming language",
          "A database management system"
        ],
        correctAnswer: 0
      },
      {
        question: "What do machine learning algorithms do?",
        options: [
          "Store data",
          "Identify patterns in data and make predictions",
          "Create visualizations",
          "Write code"
        ],
        correctAnswer: 1
      }
    ],
    difficulty: 'medium'
  },
  {
    id: 3,
    title: "Data Visualization Techniques",
    audioUrl: "#",
    transcript: "Data visualization is the graphical representation of information and data. It uses visual elements like charts, graphs, and maps to help people understand complex data sets. Effective data visualization can make patterns, trends, and correlations more apparent.",
    questions: [
      {
        question: "What is data visualization?",
        options: [
          "The process of collecting data",
          "The graphical representation of information and data",
          "The process of cleaning data",
          "The process of analyzing data"
        ],
        correctAnswer: 1
      },
      {
        question: "What can effective data visualization make more apparent?",
        options: [
          "Data storage issues",
          "Patterns, trends, and correlations",
          "Programming errors",
          "Hardware problems"
        ],
        correctAnswer: 1
      }
    ],
    difficulty: 'medium'
  }
];

const ListeningTraining: React.FC = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredExercises, setFilteredExercises] = useState<ListeningExercise[]>(listeningExercises);

  const currentExercise = filteredExercises[currentExerciseIndex];

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // 模拟音频播放
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleCheckAnswers = () => {
    let correctCount = 0;
    currentExercise.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const handleNextExercise = () => {
    setCurrentExerciseIndex((prev) => (prev + 1) % filteredExercises.length);
    setIsPlaying(false);
    setShowTranscript(false);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handlePreviousExercise = () => {
    setCurrentExerciseIndex((prev) => (prev - 1 + filteredExercises.length) % filteredExercises.length);
    setIsPlaying(false);
    setShowTranscript(false);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOptionColor = (questionIndex: number, optionIndex: number) => {
    if (!showResults) return '';
    if (optionIndex === currentExercise.questions[questionIndex].correctAnswer) return 'bg-green-100 border-green-500';
    if (optionIndex === selectedAnswers[questionIndex] && optionIndex !== currentExercise.questions[questionIndex].correctAnswer) return 'bg-red-100 border-red-500';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">听力训练</h2>
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
            {currentExercise.title}
          </CardTitle>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentExercise.difficulty)}`}>
            {currentExercise.difficulty === 'easy' ? '简单' : currentExercise.difficulty === 'medium' ? '中等' : '困难'}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button 
                onClick={handlePlayAudio} 
                disabled={isPlaying}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isPlaying ? '播放中...' : '播放音频'}
              </Button>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={() => setShowTranscript(!showTranscript)} 
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {showTranscript ? '隐藏文本' : '显示文本'}
              </Button>
              {showTranscript && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p>{currentExercise.transcript}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 space-y-6">
              <h3 className="font-medium">问题</h3>
              {currentExercise.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-2">
                  <p className="font-medium">{questionIndex + 1}. {question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`w-full text-left p-3 border rounded-md ${getOptionColor(questionIndex, optionIndex)} hover:bg-gray-50`}
                        onClick={() => !showResults && handleAnswerSelect(questionIndex, optionIndex)}
                        disabled={showResults}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {!showResults && (
              <Button onClick={handleCheckAnswers} className="w-full mt-4">
                检查答案
              </Button>
            )}
            
            {showResults && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">得分:</h3>
                <p>{score} / {currentExercise.questions.length}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            练习 {currentExerciseIndex + 1} / {filteredExercises.length}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handlePreviousExercise} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">上一个</Button>
          <Button onClick={handleNextExercise} className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">下一个</Button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">练习列表</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <Card 
              key={exercise.id} 
              className={currentExerciseIndex === filteredExercises.indexOf(exercise) ? 'border-indigo-500' : ''}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{exercise.title}</h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty === 'easy' ? '简单' : exercise.difficulty === 'medium' ? '中等' : '困难'}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{exercise.questions.length} 个问题</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeningTraining;