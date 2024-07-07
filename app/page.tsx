import { Suspense } from 'react';
import MenuGenerator from '@/components/MenuGenerator';

export default function Home() {
  return (
    <main className="container mx-auto p-6 mt-6 shadow-lg">
      <h1 className="text-5xl font-bold mb-4">오늘 점심은 뭘 먹을까?</h1>
      <h2 className="text-2xl mb-8">Lunch Menu Suggestion</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuGenerator />
      </Suspense>
    </main>
  );
}