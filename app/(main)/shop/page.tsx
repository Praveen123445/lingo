import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
import { Items } from './items';

const ShopPage = async () => {
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
      </StickyWrapper>
      <FeedWrapper>
        <div>
            <Image
              src="/shop.svg"
              alt='Shop'
              height={90}
              width={90}
            />
        </div>
        <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
            Shop
        </h1>
        <p className='text-muted-foreground text-center text-lg mb-6'>
            Spend your points on cool stuff.
        </p>
        <Items 
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage
