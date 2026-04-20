import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAchievementStore } from '../store/achievementStore';

const AchievementDisplay: React.FC = () => {
  const unlockedAchievements = useAchievementStore(state => state.getUnlockedAchievements());
  const lockedAchievements = useAchievementStore(state => state.getLockedAchievements());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>已获得的成就</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="text-3xl mr-4">{achievement.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                  {achievement.dateUnlocked && (
                    <p className="text-xs text-gray-400 mt-1">获得于: {achievement.dateUnlocked}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>未获得的成就</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-4 opacity-50">{achievement.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
                {achievement.progress !== undefined && achievement.target !== undefined && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">进度</span>
                      <span className="text-sm text-gray-500">{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementDisplay;