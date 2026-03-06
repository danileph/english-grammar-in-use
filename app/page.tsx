import Link from "next/link";
import { BookOpen, ChartNoAxesColumn, ListChecks } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 pb-8 pt-5">
      <div className="rounded-2xl border bg-white/70 p-5 shadow-sm sm:p-8">
        <section className="grid items-center gap-8 rounded-3xl border bg-muted/30 p-6 lg:grid-cols-2 lg:p-10">
          <div className="space-y-6">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
              Master English grammar with ease
            </h1>
            <p className="max-w-lg text-xl leading-relaxed text-muted-foreground">
              Learn and practice your English grammar skills in an interactive and effective way.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl px-7 text-base">
                <Link href="/units">Get started.</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-7 text-base">
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border bg-gradient-to-br from-[#f5f8f1] via-[#eef4eb] to-[#e3eee1]">
            <div className="absolute -left-8 top-5 h-36 w-36 rounded-full bg-[#9cbb9a]/20 blur-2xl" />
            <div className="absolute -right-6 bottom-6 h-40 w-40 rounded-full bg-[#b9d0b1]/30 blur-2xl" />
            <div className="absolute left-10 top-12 hidden w-[180px] rotate-[-7deg] rounded-2xl border border-[#6c9b70] bg-[#77a27d] p-4 text-white shadow-lg sm:block">
              <p className="text-3xl">📗</p>
              <p className="mt-2 text-2xl font-semibold leading-tight">Advanced Grammar in Use</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur">
              <p className="text-lg font-semibold text-foreground">Daily learning session</p>
              <p className="text-sm text-muted-foreground">1 completed, 2 in progress, keep momentum going.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border bg-white/85">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                <ChartNoAxesColumn className="h-6 w-6" />
              </div>
              <CardTitle className="text-3xl font-medium">Track your progress</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Monitor your learning journey with progress tracking and unit completion stats.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border bg-white/85">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                <ListChecks className="h-6 w-6" />
              </div>
              <CardTitle className="text-3xl font-medium">Interactive exercises</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Practice with engaging exercises to reinforce your grammar skills.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border bg-white/85">
            <CardHeader>
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle className="text-3xl font-medium">Detailed explanations</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                Get clear, detailed explanations of grammar rules and real-life examples.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border bg-gradient-to-r from-[#94b893] via-[#85ab89] to-[#9dc09f] px-6 py-10 text-center text-white shadow-sm">
          <h2 className="text-4xl font-medium">Start your English learning journey now!</h2>
          <p className="mt-3 text-xl text-white/90">
            Join over 4 million learners improving their English grammar skills.
          </p>
          <Button
            asChild
            variant="secondary"
            className="mt-6 rounded-2xl border border-white/80 bg-white px-8 py-6 text-xl text-foreground hover:bg-white/90"
          >
            <Link href="/units">Explore units</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
