import { Suspense } from 'react';
import MenuGenerator from '@/components/MenuGenerator';

export default function Home() {
  return (
    <main className="container p-6 mt-6 shadow-lg">
      <h1 className="text-5xl font-bold mb-4">오늘 점심은 뭘 먹을까?</h1>
      <h2 className="text-2xl mb-8">Lunch Menu Suggestion</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuGenerator />
      </Suspense>
      <section className="flex flex-col mt-8">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        Image Source :
        사진: 
        <a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/LcIqgBlYxGU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>의
        <a href="https://unsplash.com/@gronemo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Roméo A.</a>
        사진: 
        <a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/sCAN9M2uaS0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>의
        <a href="https://unsplash.com/@vunguyen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vu Nguyen</a>
        <br />
        <br />
        https://pixabay.com/<br />
        https://picjumbo.com/<br />
        https://www.tastemade.com/recipes/ultimate-chirashi-bowl<br />
        나무위키<br />
        위키백과<br />

      </section>
    </main>
  );
}