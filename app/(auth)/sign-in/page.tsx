"use client";

import { BookOpenCheck } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "sign-in" | "sign-up";

export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = useMemo(() => mode === "sign-up", [mode]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/units");
    }
  }, [router, status]);

  async function handleSignIn() {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/units",
    });

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result.url ?? "/units");
  }

  async function handleRegister() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      if (response.status === 409) {
        setError("This email is already registered.");
        return;
      }

      setError("Unable to create account.");
      return;
    }

    await handleSignIn();
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        await handleRegister();
      } else {
        await handleSignIn();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center px-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <BookOpenCheck className="mx-auto h-10 w-10" />
          <CardTitle>{isSignUp ? "Create account" : "Welcome back"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Create an account with your email and password."
              : "Sign in with your email and password to continue learning."}
          </CardDescription>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button type="button" variant={isSignUp ? "outline" : "default"} onClick={() => setMode("sign-in")}>
              Sign in
            </Button>
            <Button type="button" variant={isSignUp ? "default" : "outline"} onClick={() => setMode("sign-up")}>
              Sign up
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isSignUp ? "At least 8 characters" : "Your password"}
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {isSignUp ? (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (isSignUp ? "Creating account..." : "Signing in...") : isSignUp ? "Create account" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
