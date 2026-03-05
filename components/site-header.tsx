"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, BookOpenText, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/units", label: "Units" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/settings", label: "Settings" },
];

export function SiteHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
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
    <header className="sticky top-0 z-30 w-full px-4 pt-4">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between rounded-2xl border bg-white/80 px-5 shadow-sm backdrop-blur">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
              <BookOpenText className="h-5 w-5" />
            </span>
            <span className="hidden leading-tight sm:block">
              Advanced
              <br />
              Grammar in Use
            </span>
          </Link>
          <Separator orientation="vertical" className="hidden h-6 lg:block" />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild className="text-base text-muted-foreground">
                <Link
                  href={item.href}
                  className={pathname === item.href ? "font-semibold text-foreground" : ""}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
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
              className="rounded-full"
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
