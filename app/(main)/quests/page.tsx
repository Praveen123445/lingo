import { FeedWrapper } from '@/components/feed-wrapper';
import { Promo } from '@/components/promo';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { Progress } from '@/components/ui/progress';
import { UserProgress } from '@/components/user-progress';
import { quests } from '@/constants';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubsciptionData = getUserSubscription();

    const [
        userProgress,
        userSubsciption,
    ] = await Promise.all([
        userProgressData,
        userSubsciptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

  const isPro = !!userSubsciption?.isActive;
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
      </StickyWrapper>
      <FeedWrapper>
        <div>
            <Image
              src="/quests.svg"
              alt='Quests'
              height={90}
              width={90}
            />
        </div>
        <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
            Quests
        </h1>
        <p className='text-muted-foreground text-center text-lg mb-6'>
            Complete qusets by earning points
        </p>
        <ul className='w-full'>
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100;

            return (
              <div
                className='flex items-center'
                key={quest.title}
              >
                <Image 
                  src="/points.svg"
                  alt='Points'
                  width={60}
                  height={60}
                />
                <div className='flex flex-col gap-y-2 w-full'>
                  <p className='text-neutral-700 text-xl font-bold'>
                    {quest.title}
                  </p>
                  <Progress value={progress} className='h-3'/>
                </div>
              </div>
            )
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage
