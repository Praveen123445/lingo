import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation';
import React from 'react'
import { Quiz } from './quiz';

const LessonPage =async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubsciptionData = getUserSubscription();

  const [
    lesson,
    userProgress,
    userSubsciption,
  ] = await Promise.all([
    lessonData,
    userProgressData,
    userSubsciptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100;
  return (
    <Quiz 
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubsciption={userSubsciption}
    />
  );
}

export default LessonPage
