import Link from "next/link";

import { ExampleFeedbackForm } from "@/components/example-feedback-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.3fr,1fr]">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Interactive Edition</p>
          <h1 className="text-4xl font-bold tracking-tight">Advanced Grammar in Use</h1>
          <p className="max-w-prose text-muted-foreground">
            Structured grammar practice with progress tracking, topic-based learning paths, and room
            to add interactive exercises.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/units">Start learning</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Progress-aware units</CardTitle>
              <CardDescription>Status per grammar unit and topic grouping.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scalable architecture</CardTitle>
              <CardDescription>Next.js App Router + Prisma + Auth.js foundation.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Form validation example</CardTitle>
            <CardDescription>react-hook-form + zod starter pattern.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleFeedbackForm />
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
