"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { label: "about", href: "/" },
  { label: "writing", href: "/posts" },
  { label: "projects", href: "/projects" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <>
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-background px-8 py-12 z-40">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground">Dev</h2>
        </div>

        <div className="space-y-6 flex-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block text-lg font-light transition-colors ${
                pathname === item.href ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="space-y-4 text-xs text-muted-foreground">
          <p>Built with Next.js</p>
          <p>© 2025</p>
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
  )
}
