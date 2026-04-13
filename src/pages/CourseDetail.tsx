import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseStore, useUserStore } from '../store';
import { BookOpen, Play, Lock, Check, Clock, Star, Users } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '0');
  const { currentCourse, lessons, progress, fetchCourseDetails, fetchLessons, fetchProgress, enrollCourse, loading } = useCourseStore();
  const { user } = useUserStore();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
      fetchLessons(courseId);
      if (user) {
        fetchProgress(courseId);
      }
    }
  }, [courseId, fetchCourseDetails, fetchLessons, fetchProgress, user]);

  const handleEnroll = async () => {
    if (user) {
      await enrollCourse(courseId);
      setIsEnrolled(true);
    }
  };

  // 计算课程进度
  const calculateProgress = () => {
    if (lessons.length === 0) return 0;
    const completedLessons = progress.filter(p => p.completed).length;
    return Math.round((completedLessons / lessons.length) * 100);
  };

  if (loading || !currentCourse) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="space-y-3">
              {Array(5).fill(0).map((_, index) => (
                <div key={index} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            {currentCourse.cover_image_url ? (
              <img
                src={currentCourse.cover_image_url}
                alt={currentCourse.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <BookOpen className="h-20 w-20 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 px-2 py-1 rounded text-xs font-medium mr-2">
                    {currentCourse.level}
                  </span>
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {currentCourse.category}
                  </span>
                  {currentCourse.is_premium && (
                    <span className="bg-[#ed8936] px-2 py-1 rounded text-xs font-medium ml-2">
                      高级
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentCourse.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{currentCourse.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{currentCourse.enroll_count} 人学习</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{currentCourse.duration} 分钟</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold mb-2">课程简介</h2>
                <p className="text-gray-600">{currentCourse.description}</p>
              </div>
              <div className="flex flex-col space-y-3 w-full md:w-auto">
                {user ? (
                  isEnrolled ? (
                    <Link
                      to={`/courses/${courseId}/lessons/${lessons[0]?.id || 1}`}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      开始学习
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                    >
                      立即报名
                    </button>
                  )
                ) : (
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    登录后报名
                  </Link>
                )}
                <div className="text-center">
                  <span className="text-2xl font-bold">¥{currentCourse.price === 0 ? '免费' : currentCourse.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 课程进度 */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">学习进度</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">总体进度</span>
                <span className="text-sm font-medium">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              已完成 {progress.filter(p => p.completed).length}/{lessons.length} 章节
            </p>
          </div>
        )}

        {/* 课程章节 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">课程章节</h2>
          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
              const isCompleted = lessonProgress?.completed || false;
              const isLocked = currentCourse.is_premium && !isEnrolled;
              
              return (
                <div key={lesson.id} className="border rounded-lg overflow-hidden">
                  <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                    <div className="mr-4">
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-gray-400" />
                      ) : isCompleted ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Play className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-3">{index + 1}.</span>
                        <h3 className="font-medium">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {lesson.duration && (
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {lesson.duration} 分钟
                        </span>
                      )}
                      {!isLocked && (
                        <Link
                          to={`/courses/${courseId}/lessons/${lesson.id}`}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                        >
                          {isCompleted ? '复习' : '学习'}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 课程评价 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">课程评价</h2>
          <div className="flex items-center mb-6">
            <div className="text-3xl font-bold mr-4">{currentCourse.rating}</div>
            <div>
              <div className="flex items-center mb-1">
                {Array(5).fill(0).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.floor(currentCourse.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({currentCourse.enroll_count} 人评价)
                </span>
              </div>
              <div className="space-y-1">
                {Array(5).fill(0).reverse().map((_, index) => {
                  const rating = 5 - index;
                  return (
                    <div key={index} className="flex items-center">
                      <span className="text-sm w-12">{rating}星</span>
                      <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {/* 示例评价 */}
            <div className="border-t pt-4">
              <div className="flex items-start mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-medium">张</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium mr-2">张三</h4>
                    <div className="flex">
                      {Array(5).fill(0).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3 w-3 ${index < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    课程内容非常丰富，讲解清晰易懂，实战案例很有针对性，学到了很多实用的数据分析技能。
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2024-01-15</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-start mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-medium">李</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="font-medium mr-2">李四</h4>
                    <div className="flex">
                      {Array(5).fill(0).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3 w-3 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    老师讲解很详细，课程结构合理，从基础到进阶，适合不同水平的学习者。互动练习很有帮助。
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2024-01-10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
