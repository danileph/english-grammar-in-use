"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/units", label: "Units" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/settings", label: "Settings" },
];

export function SiteHeader() {
  const { data: session } = useSession();
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    if (!session?.user) {
      setUser(null);
      return;
    }

    setUser({
      id: session.user.id,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
    });
  }, [session, setUser]);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Advanced Grammar in Use
          </Link>
          <Separator orientation="vertical" className="hidden h-6 md:block" />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">{session.user.email}</p>
            </div>
            <div className="relative h-9 w-9 overflow-hidden rounded-full border">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-semibold">
                  {session.user.name?.[0] ?? "U"}
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild size="sm">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
