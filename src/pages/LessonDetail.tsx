import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCourseStore, useUserStore } from '../store';
import { Check, Clock, ChevronLeft, ChevronRight, BookOpen, Play } from 'lucide-react';

const LessonDetail: React.FC = () => {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const courseId = parseInt(id || '0');
  const currentLessonId = parseInt(lessonId || '0');
  const { currentCourse, lessons, progress, fetchCourseDetails, fetchLessons, fetchProgress, updateProgress, loading } = useCourseStore();
  const { user } = useUserStore();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
      fetchLessons(courseId);
      if (user) {
        fetchProgress(courseId);
      }
    }
  }, [courseId, fetchCourseDetails, fetchLessons, fetchProgress, user]);

  useEffect(() => {
    if (user) {
      const lessonProgress = progress.find(p => p.lesson_id === currentLessonId);
      setIsCompleted(lessonProgress?.completed || false);
    }
  }, [progress, currentLessonId, user]);

  const handleComplete = async () => {
    if (user) {
      await updateProgress(currentLessonId, !isCompleted);
      setIsCompleted(!isCompleted);
    } else {
      // 未登录用户可以看到完成按钮，但点击时会提示登录
      alert('请先登录以追踪学习进度');
    }
  };

  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (loading || !currentCourse || !currentLesson) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="h-80 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* 课程导航 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/courses/${courseId}`} className="flex items-center text-blue-600 hover:underline mr-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                返回课程
              </Link>
              <h2 className="font-medium">{currentCourse.title}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{currentLesson.duration} 分钟</span>
            </div>
          </div>
        </div>

        {/* 章节内容 */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧章节列表 */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="font-semibold mb-4">课程章节</h3>
              <div className="space-y-2">
                {lessons.map((lesson, index) => {
                  const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
                  const lessonIsCompleted = lessonProgress?.completed || false;
                  const isCurrent = lesson.id === currentLessonId;

                  return (
                    <Link
                      key={lesson.id}
                      to={`/courses/${courseId}/lessons/${lesson.id}`}
                      className={`flex items-center p-3 rounded-md transition-colors ${isCurrent ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
                    >
                      <div className="mr-3">
                        {lessonIsCompleted ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Play className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{index + 1}.</span>
                          <span className={`text-sm ${isCurrent ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        {lesson.duration && (
                          <span className="text-xs text-gray-500">{lesson.duration} 分钟</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold mb-6">{currentLesson.title}</h1>
              
              {/* 内容类型：视频 */}
              {currentLesson.content_type === 'video' && (
                <div className="mb-8">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                    {currentLesson.content_url ? (
                      <>
                        <iframe
                          src={currentLesson.content_url}
                          title={currentLesson.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </>
                    ) : (
                      <div className="text-white text-center">
                        <Play className="h-12 w-12 mx-auto mb-2" />
                        <p>视频内容</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-700 mb-2">视频说明</h3>
                    <p className="text-gray-700">本视频由专业教师录制，涵盖了课程大纲中的核心知识点。建议在观看过程中做好笔记，并尝试完成视频中提到的练习。</p>
                    <div className="mt-2 text-xs text-gray-500">
                      视频链接: {currentLesson.content_url}
                    </div>
                  </div>
                </div>
              )}

              {/* 内容类型：文本 */}
              {currentLesson.content_type === 'text' && (
                <div className="mb-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      {currentLesson.description}
                    </p>
                    <p className="text-gray-600 mb-4">
                      这是文本类型的学习内容，包含详细的知识点讲解、概念说明和示例分析。
                    </p>
                    <p className="text-gray-600 mb-4">
                      通过阅读这些内容，您将掌握相关的数据分析概念和方法，为实际应用打下基础。
                    </p>
                    <h3 className="text-lg font-semibold mt-6 mb-3">关键知识点</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>数据分析的基本概念和流程</li>
                      <li>数据收集和清洗的方法</li>
                      <li>数据可视化的基本原则</li>
                      <li>数据分析的常用工具和技术</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 内容类型：互动练习 */}
              {currentLesson.content_type === 'interactive' && (
                <div className="mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">互动练习</h3>
                    <p className="text-gray-600 mb-4">
                      {currentLesson.description}
                    </p>
                    <div className="space-y-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-medium mb-2">问题 1：数据清洗的主要步骤是什么？</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="radio" id="q1a1" name="q1" className="mr-2" />
                            <label htmlFor="q1a1">数据收集、数据转换、数据分析</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="q1a2" name="q1" className="mr-2" />
                            <label htmlFor="q1a2">数据识别、数据清洗、数据验证</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="q1a3" name="q1" className="mr-2" />
                            <label htmlFor="q1a3">数据导入、数据处理、数据导出</label>
                          </div>
                        </div>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-medium mb-2">问题 2：以下哪种图表最适合展示数据的变化趋势？</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="radio" id="q2a1" name="q2" className="mr-2" />
                            <label htmlFor="q2a1">饼图</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="q2a2" name="q2" className="mr-2" />
                            <label htmlFor="q2a2">折线图</label>
                          </div>
                          <div className="flex items-center">
                            <input type="radio" id="q2a3" name="q2" className="mr-2" />
                            <label htmlFor="q2a3">柱状图</label>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        提交答案
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleComplete}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${isCompleted ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        已完成
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        标记为完成
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {prevLesson && (
                    <Link
                      to={`/courses/${courseId}/lessons/${prevLesson.id}`}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      上一章
                    </Link>
                  )}
                  {nextLesson && (
                    <Link
                      to={`/courses/${courseId}/lessons/${nextLesson.id}`}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      下一章
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
