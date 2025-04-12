// components/nav.tsx (Example, adjust as needed)
import Link from 'next/link';
import { Button } from './ui/button';
import { UtensilsCrossed, Home, Info, Moon, Sun } from 'lucide-react'; // Added icons
import { ModeToggle } from './ui/toggle-button';

export default function Nav() {

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
                    <UtensilsCrossed className="h-6 w-6 text-primary" />
                    <span>랜덤 메뉴</span>
                </Link>
                <div className="flex items-center space-x-2">
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}