import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SpeakingExercise {
  id: number;
  sentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string;
}

const speakingExercises: SpeakingExercise[] = [
  {
    id: 1,
    sentence: "Data analysis is essential for making informed business decisions.",
    difficulty: 'easy',
    tips: "注意 'analysis' 的发音，重音在第二个音节"
  },
  {
    id: 2,
    sentence: "Machine learning algorithms can help predict customer behavior patterns.",
    difficulty: 'medium',
    tips: "注意 'algorithms' 和 'patterns' 的发音"
  },
  {
    id: 3,
    sentence: "Statistical analysis helps identify trends and correlations in data sets.",
    difficulty: 'medium',
    tips: "注意 'statistical' 和 'correlations' 的发音"
  },
  {
    id: 4,
    sentence: "Data visualization tools like Tableau can help communicate insights effectively.",
    difficulty: 'medium',
    tips: "注意 'visualization' 和 'effectively' 的发音"
  },
  {
    id: 5,
    sentence: "The implementation of predictive analytics can significantly improve business outcomes.",
    difficulty: 'hard',
    tips: "注意 'implementation' 和 'predictive analytics' 的发音"
  }
];

const SpeakingPractice: React.FC = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filteredExercises, setFilteredExercises] = useState<SpeakingExercise[]>(speakingExercises);
  const [recordings, setRecordings] = useState<Record<number, string>>({});

  const currentExercise = filteredExercises[currentExerciseIndex];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    // 模拟录音功能
    const interval = setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          setIsRecording(false);
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordings(prev => ({ ...prev, [currentExercise.id]: '录音文件' }));
  };

  const handlePlayRecording = () => {
    setIsPlaying(true);
    // 模拟播放功能
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleNextExercise = () => {
    setCurrentExerciseIndex((prev) => (prev + 1) % filteredExercises.length);
    setIsRecording(false);
    setIsPlaying(false);
    setRecordingDuration(0);
  };

  const handlePreviousExercise = () => {
    setCurrentExerciseIndex((prev) => (prev - 1 + filteredExercises.length) % filteredExercises.length);
    setIsRecording(false);
    setIsPlaying(false);
    setRecordingDuration(0);
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
        <h2 className="text-2xl font-bold">口语跟读</h2>
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
            练习 {currentExerciseIndex + 1} / {filteredExercises.length}
          </CardTitle>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentExercise.difficulty)}`}>
            {currentExercise.difficulty === 'easy' ? '简单' : currentExercise.difficulty === 'medium' ? '中等' : '困难'}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-lg font-medium">{currentExercise.sentence}</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-md">
              <h3 className="font-medium mb-1">发音提示:</h3>
              <p className="text-sm">{currentExercise.tips}</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex justify-center">
                {isRecording ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold">{recordingDuration}</span>
                    </div>
                    <Button onClick={handleStopRecording} className="bg-red-600 hover:bg-red-700">
                      停止录音
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleStartRecording} className="bg-indigo-600 hover:bg-indigo-700">
                    开始录音
                  </Button>
                )}
              </div>
              
              {recordings[currentExercise.id] && (
                <div className="flex justify-center">
                  <Button 
                    onClick={handlePlayRecording} 
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" 
                    disabled={isPlaying}
                  >
                    {isPlaying ? '播放中...' : '播放录音'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            进度: {currentExerciseIndex + 1} / {filteredExercises.length}
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
                  <h4 className="font-medium text-sm">{exercise.sentence.substring(0, 50)}...</h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty === 'easy' ? '简单' : exercise.difficulty === 'medium' ? '中等' : '困难'}
                  </div>
                </div>
                {recordings[exercise.id] && (
                  <div className="mt-2 text-xs text-green-600">
                    已录音
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

export default SpeakingPractice;