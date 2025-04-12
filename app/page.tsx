// page.tsx
import { Suspense } from 'react';
import MenuGenerator from '@/components/MenuGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link'; // Import Link for internal navigation if needed
import { UtensilsCrossed, HelpCircle, HeartPulse, Brain, Flame, Leaf, Clock } from 'lucide-react'; // Import icons

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center mb-12 md:mb-16 pt-8 pb-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-slate-800 dark:via-slate-700 dark:to-gray-800 rounded-lg shadow-md">
        <UtensilsCrossed className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight">
          오늘 <span className="text-primary">점심·저녁</span> 뭐 먹지? 🤔
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          매일 반복되는 메뉴 고민, 이젠 그만! 🙅‍♀️ <br/>
          랜덤 메뉴 돌림판으로 쉽고 빠르게 맛있는 식사를 결정하세요! 🍽️✨
        </p>
      </section>

      {/* Menu Generator Section */}
      <section id="generator" className="mb-12 md:mb-16 p-6 bg-card text-card-foreground rounded-xl shadow-lg border">
         <Suspense fallback={<div className="text-center py-10 text-lg font-semibold">🎲 메뉴 생성기 로딩 중...</div>}>
            <MenuGenerator />
          </Suspense>
      </section>

      {/* Additional Content Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
        {/* Guide Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <HelpCircle className="mr-2 h-6 w-6 text-blue-500" />
              💡 사용 가이드
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <ol className="list-decimal list-inside space-y-1">
              <li>원하는 음식 종류(Cuisine) 버튼을 선택하세요. (기본: 아무거나)</li>
              <li>&apos;랜덤 메뉴 생성 ✨&apos; 버튼을 클릭하세요.</li>
              <li>오늘의 추천 메뉴와 이미지를 확인하세요! 😋</li>
              <li>&apos;Surprise Me 🎉&apos; 버튼으로 완전 랜덤 추천도 가능해요!</li>
              <li>추천 목록에서 이전 기록을 볼 수 있어요.</li>
              <li>검색창으로 메뉴 정보를 바로 찾아보세요. 🔍</li>
            </ol>
          </CardContent>
        </Card>

        {/* Healthy Food Tips Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <HeartPulse className="mr-2 h-6 w-6 text-green-500" />
              🌱 건강한 식단 팁
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2">
            <p className="flex items-center"><Leaf className="mr-2 h-4 w-4 text-green-600" />채소를 충분히 섭취하고 다양한 색깔의 음식을 즐기세요.</p>
            <p className="flex items-center"><Brain className="mr-2 h-4 w-4 text-blue-600" />통곡물, 건강한 지방(견과류, 생선)을 포함시키세요.</p>
            <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-orange-600" />가공식품과 설탕 섭취를 줄이고 천천히 식사하세요.</p>
            <p className="font-medium text-sm text-foreground">#저속노화 #건강식단 #웰빙</p>
          </CardContent>
        </Card>

        {/* Warming Foods Card */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-semibold">
              <Flame className="mr-2 h-6 w-6 text-red-500" />
              🔥 몸을 따뜻하게!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2">
            <p>날씨가 쌀쌀할 땐 따뜻한 음식이 최고죠!</p>
            <p><strong>추천:</strong> 국밥, 탕류 (설렁탕, 감자탕, 삼계탕), 찌개 (김치찌개, 된장찌개), 칼국수, 수제비, 따뜻한 차 ☕</p>
            <p className="text-sm">혈액순환을 돕고 몸의 온도를 높여줘요.</p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mb-12 md:mb-16">
        <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">자주 묻는 질문 ❓</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">이 사이트는 무엇인가요?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              매일 점심이나 저녁 메뉴를 고르는 데 어려움을 겪는 분들을 위해 만들어진 랜덤 메뉴 추천 웹사이트입니다. 간단한 클릭으로 다양한 종류의 음식 메뉴를 추천받을 수 있습니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">메뉴는 어떻게 추가되나요?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              메뉴 목록은 주기적으로 업데이트되며, 인기 있거나 특색 있는 다양한 국가의 음식들을 포함하려고 노력하고 있습니다. 사용자의 제안도 환영합니다! 😊
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">추천 기록은 어디에 저장되나요?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              최근 추천 메뉴 기록은 사용자의 브라우저 내 로컬 스토리지에 저장됩니다. 서버에는 저장되지 않으므로, 브라우저 캐시를 삭제하면 기록도 사라집니다.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">소화가 잘 되는 음식은 어떤 것이 있나요?</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              일반적으로 죽, 맑은 국 (미역국, 뭇국), 계란찜, 두부 요리, 흰살 생선구이, 익힌 채소 등이 소화에 부담이 적습니다. 자극적인 음식이나 기름진 음식은 피하는 것이 좋습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Image Source Section - Cleaned up */}
      <section className="text-center text-xs text-muted-foreground/70 mt-16 border-t pt-6">
        <h3 className="font-semibold mb-2">Image Sources & References:</h3>
        <div className="space-y-1">
          <p>
            Photos by <a href="https://unsplash.com/@gronemo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Roméo A.</a> and <a href="https://unsplash.com/@vunguyen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Vu Nguyen</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Unsplash</a>
          </p>
          <p>
            Other images from: Pixabay, Picjumbo, Tastemade, Namu Wiki, Wikipedia.
          </p>
          <p>All images are used for illustrative purposes only.</p>
        </div>
      </section>
    </div>
  );
}