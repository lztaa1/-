import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useProgressStore } from '../store/progressStore';

const ProgressTracker: React.FC = () => {
  const courseProgress = useProgressStore(state => state.getAllCourseProgress());
  const moduleProgress = useProgressStore(state => state.getAllModuleProgress());

  // 计算总体学习进度
  const totalCourseProgress = courseProgress.length > 0 
    ? courseProgress.reduce((sum, course) => sum + course.progress, 0) / courseProgress.length 
    : 0;

  const totalModuleProgress = moduleProgress.length > 0 
    ? moduleProgress.reduce((sum, module) => sum + module.progress, 0) / moduleProgress.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>总体学习进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">课程进度</span>
                <span className="text-sm text-gray-500">{Math.round(totalCourseProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${totalCourseProgress}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">互动学习模块进度</span>
                <span className="text-sm text-gray-500">{Math.round(totalModuleProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${totalModuleProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>课程进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseProgress.map((course) => (
              <div key={course.courseId}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{course.courseName}</span>
                  <span className="text-sm text-gray-500">{course.progress}% ({course.lessonsCompleted}/{course.totalLessons} 课时)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  最后访问: {course.lastAccessed}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>互动学习模块进度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moduleProgress.map((module) => (
              <div key={module.moduleId}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{module.moduleName}</span>
                  <span className="text-sm text-gray-500">{module.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  最后访问: {module.lastAccessed}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;