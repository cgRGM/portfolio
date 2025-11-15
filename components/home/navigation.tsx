"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "about", href: "/" },
  { label: "writing", href: "/posts" },
  { label: "projects", href: "/projects" },
  { label: "resume", href: "/resume" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-background px-8 z-40">
        <div>
          <img
            src="/og-image.png"
            alt="CG Stewart"
            className="w-full size-48 object-contain"
            style={{
              // Option 1: Invert colors (good for black text on white background)

              // Option 2: For black background with white text - make background transparent
              maskImage: "linear-gradient(black, black)",
              WebkitMaskImage: "linear-gradient(black, black)",

              // Option 3: Use difference blend mode
              mixBlendMode: "difference",

              // Option 4: Custom mask for specific shapes
              // maskImage: 'url(/mask.svg)',
              // WebkitMaskImage: 'url(/mask.svg)',
            }}
          />
        </div>

        <div className="space-y-6 flex-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-lg font-light transition-colors ${
                pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-40">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 py-4 text-center text-sm transition-colors border-t-2 ${
                pathname === item.href
                  ? "text-accent border-t-accent"
                  : "text-muted-foreground border-t-transparent hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
