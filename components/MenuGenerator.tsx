'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { menus, CountryType, countryLabels } from '@/lib/menus';
import { addToHistory } from '@/utils/history';
// import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useThrottle } from '@/hooks/useThrottle';

export default function MenuGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>('all');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const storedHistory = localStorage.getItem('menuHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank')
    }
  }

  const generateMenu = useThrottle(() => {
    const countryMenus = menus[selectedCountry];
    const randomMenu = countryMenus[Math.floor(Math.random() * countryMenus.length)];
    setSelectedMenu(randomMenu.menu);
    setSelectedImage(randomMenu.image);

    // Update history
    const updatedHistory = addToHistory(randomMenu.menu);
    setHistory(updatedHistory);
    setSearchQuery(randomMenu.menu)
  }, 1000);

  return (
    <div>
      <RadioGroup defaultValue="all" onValueChange={(value) => setSelectedCountry(value as CountryType)}>
        <div className="flex flex-wrap gap-4">
          {(Object.keys(countryLabels) as CountryType[]).map((country) => (
            <div key={country} className="flex items-center space-x-2">
              <RadioGroupItem value={country} id={country} />
              <Label htmlFor={country}><Badge className="text-xl">{countryLabels[country]}</Badge></Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="m-2">
        <Button onClick={generateMenu} className="mt-4 mb-4 text-xl">랜덤 메뉴 생성 Tada!</Button>
      </div>


      {selectedMenu && (
        <Card className="my-4 p-5 mx-auto w-[300px] md:w-[450px]">
          <CardHeader>
            <CardTitle>
              <p className="text-4xl font-bold">{selectedMenu}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedImage && (
              <div>
                <Image
                  src={selectedImage}
                  alt={selectedMenu}
                  width={375}
                  height={200}
                  quality={75}
                  className="rounded-lg"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">추천 목록들 previous suggestions...</h3>
        <ol className="list-decimal list-inside">
          {history.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ol>
      </div>

      <Card className="my-8">
        <CardHeader>
          <CardTitle className="text-2xl">구글 검색</CardTitle>
          <CardDescription>원하는 정보를 검색해보세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg p-6"
            />
            <Button type="submit" size="lg" className="p-6">
              <Search className="h-6 w-6" />
              <span className="ml-2">검색</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}