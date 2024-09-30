'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { menus, CountryType, countryLabels } from '@/lib/menus';
import { addToHistory } from '@/utils/history';
// import Link from 'next/link';
import { Badge } from './ui/badge';

export default function MenuGenerator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryType>('all');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('menuHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const generateMenu = () => {
    const countryMenus = menus[selectedCountry];
    const randomMenu = countryMenus[Math.floor(Math.random() * countryMenus.length)];
    setSelectedMenu(randomMenu.menu);
    setSelectedImage(randomMenu.image);

    // Update history
    const updatedHistory = addToHistory(randomMenu.menu);
    setHistory(updatedHistory);
  };

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
    </div>
  );
}