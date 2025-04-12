// MenuGenerator.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Keep for functionality
import { Label } from "@/components/ui/label"; // Keep for association
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { menus, CountryType, countryLabels } from '@/lib/menus';
import { addToHistory, clearHistory as clearStorageHistory, getHistory } from '@/utils/history';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Shuffle, CheckCircle, History } from 'lucide-react'; // Import icons
import { useThrottle } from '@/hooks/useThrottle'; // Assuming useThrottle hook exists

// Helper to get emoji based on country
const getCountryEmoji = (country: CountryType): string => {
  switch (country) {
    case 'korea': return '🇰🇷';
    case 'pizza': return '🍕'; // Using pizza emoji for this mixed category
    case 'china': return '🇨🇳';
    case 'japan': return '🇯🇵';
    case 'asia': return '🌏';
    case 'mexico': return '🇲🇽'; // Using Mexico for Spain/Mexico
    case 'italy': return '🇮🇹';
    case 'france': return '🇫🇷';
    case 'all':
    default: return '🌍';
  }
};

export default function MenuGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>('all');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // For loading state on button

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery + " 맛집")}`, '_blank'); // Added " 맛집" for better search
    }
  };

  const performGeneration = useCallback((country: CountryType) => {
    setIsGenerating(true);
    setSelectedMenu(null); // Clear previous selection immediately
    setSelectedImage(null);

    setTimeout(() => { // Add a small delay for visual feedback
        const countryMenus = menus[country] && menus[country].length > 0 ? menus[country] : menus.all;
        if (countryMenus.length === 0) {
            console.error("No menus available for selection.");
            setSelectedMenu("메뉴 목록을 불러올 수 없습니다. 😭");
            setIsGenerating(false);
            return;
        }
        const randomIndex = Math.floor(Math.random() * countryMenus.length);
        const randomMenu = countryMenus[randomIndex];

        setSelectedMenu(randomMenu.menu);
        setSelectedImage(randomMenu.image);
        setSearchQuery(randomMenu.menu.split(',')[0].split(' ')[0]); // Set search query to the first part of the menu name

        // Update history
        const updatedHistory = addToHistory(randomMenu.menu);
        setHistory(updatedHistory);
        setIsGenerating(false);
    }, 300); // 300ms delay
  }, []); // Dependencies: menus, addToHistory

  const generateMenu = useThrottle(() => {
    performGeneration(selectedCountry);
  }, 1000); // Throttle regular generation

  const generateSurpriseMenu = useThrottle(() => {
      performGeneration('all');
  }, 1000); // Throttle surprise generation

  const handleClearHistory = () => {
    clearStorageHistory();
    setHistory([]);
  };

  return (
    <div className="space-y-8">
      {/* Cuisine Selection - Button Style */}
      <div>
        <Label className="text-lg font-semibold mb-3 block">1. 원하는 종류 선택! 👇</Label>
        <RadioGroup
          value={selectedCountry}
          onValueChange={(value) => setSelectedCountry(value as CountryType)}
          className="flex flex-wrap gap-3"
        >
          {(Object.keys(countryLabels) as CountryType[]).map((country) => (
            <div key={country}>
              <RadioGroupItem value={country} id={country} className="sr-only" />
              <Label
                htmlFor={country}
                className={`flex items-center cursor-pointer rounded-full border px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 ease-in-out
                            ${selectedCountry === country
                               ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-background'
                               : 'bg-background hover:bg-accent hover:text-accent-foreground border-border'
                            }`}
              >
                <span className="mr-2">{getCountryEmoji(country)}</span>
                {countryLabels[country]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4 md:space-y-0 md:space-x-4">
         <Label className="text-lg font-semibold mb-3 block md:hidden">2. 버튼 클릭! ✨</Label>
        <Button
          onClick={generateMenu}
          disabled={isGenerating}
          size="lg"
          className="w-full md:w-auto text-lg px-8 py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1"
        >
          {isGenerating ? (
             <>
                <Shuffle className="mr-2 h-5 w-5 animate-spin" /> 돌리는 중...
             </>
           ) : (
             <>
                <Shuffle className="mr-2 h-5 w-5" /> 랜덤 메뉴 생성 ✨
             </>
           )}
        </Button>
         <Button
          onClick={generateSurpriseMenu}
          disabled={isGenerating}
          size="lg"
          variant="outline"
          className="w-full md:w-auto text-lg px-8 py-6 rounded-lg shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1"
        >
           {isGenerating ? (
             <>
                <Shuffle className="mr-2 h-5 w-5 animate-spin" /> 돌리는 중...
             </>
           ) : (
             <>
                <Shuffle className="mr-2 h-5 w-5" /> Surprise Me! 🎉
             </>
           )}
        </Button>
      </div>

      {/* Result Display */}
      {selectedMenu && (
        <Card className="my-6 mx-auto max-w-md md:max-w-lg border-2 border-primary shadow-xl animate-fade-in-up">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" /> 오늘의 추천!
            </CardTitle>
            <CardDescription className="text-lg">바로 이거다! 😋</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {selectedImage && (
              <div className="mb-4 overflow-hidden rounded-lg shadow-md aspect-video relative">
                <Image
                  src={selectedImage}
                  alt={selectedMenu}
                  fill // Use fill for responsive aspect ratio container
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Provide sizes hint
                  quality={75}
                  className="object-cover" // Ensure image covers the area
                  priority // Prioritize loading the main result image
                />
              </div>
            )}
            <p className="text-2xl md:text-3xl font-semibold break-words px-2">{selectedMenu}</p>
          </CardContent>
        </Card>
      )}
       {!selectedMenu && !isGenerating && (
         <div className="text-center text-muted-foreground py-6">
            <p>👆 버튼을 눌러 메뉴를 추천 받아보세요!</p>
         </div>
       )}

      {/* Search Section */}
       <Card className="my-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-gray-800 border shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            🔍 더 찾아보기
          </CardTitle>
          <CardDescription>선택된 메뉴나 궁금한 음식을 검색해보세요! (새 창)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              type="text"
              placeholder="예: 제육볶음 맛집"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg p-3 flex-grow rounded-md"
              aria-label="검색어 입력"
            />
            <Button type="submit" size="lg" className="p-3 rounded-md w-full sm:w-auto">
              <Search className="h-5 w-5" />
              <span className="ml-2">구글 검색</span>
            </Button>
          </form>
        </CardContent>
      </Card>

       {/* History Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
             <History className="h-6 w-6 text-indigo-500"/> 추천 목록 📜
          </h3>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              <Trash2 className="mr-1 h-4 w-4" />
              기록 지우기
            </Button>
          )}
        </div>
        {history.length > 0 ? (
          <Card className="border-dashed border-gray-300 dark:border-gray-700">
             <CardContent className="p-4">
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground max-h-60 overflow-y-auto pr-2">
                {history.map((item, index) => (
                    <li key={index} className="text-sm md:text-base truncate">
                    {item}
                    </li>
                ))}
                </ol>
             </CardContent>
          </Card>
        ) : (
          <p className="text-muted-foreground text-center py-4">아직 추천 기록이 없어요. 🤔</p>
        )}
      </div>
    </div>
  );
}

// Add simple fade-in animation in globals.css if needed:
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in-up {
  animation: fadeIn 0.5s ease-out forwards;
  animation-name: fadeInUp; // Or use a custom fadeInUp animation
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
*/