"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ExampleFeedbackFormInput,
  exampleFeedbackFormSchema,
} from "@/lib/validators/example-form";

export function ExampleFeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ExampleFeedbackFormInput>({
    resolver: zodResolver(exampleFeedbackFormSchema),
    defaultValues: {
      displayName: "",
      feedback: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border p-5">
      <h2 className="text-base font-semibold">Example profile feedback form</h2>
      <div className="space-y-2">
        <Label htmlFor="displayName">Display name</Label>
        <Input id="displayName" placeholder="Your study name" {...register("displayName")} />
        {errors.displayName && (
          <p className="text-sm text-destructive">{errors.displayName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback</Label>
        <textarea
          id="feedback"
          className="min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="What do you want to improve?"
          {...register("feedback")}
        />
        {errors.feedback && <p className="text-sm text-destructive">{errors.feedback.message}</p>}
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : "Save feedback"}
      </Button>
      {isSubmitSuccessful && (
        <p className="text-sm text-emerald-700">Saved locally. Connect to API later.</p>
      )}
    </form>
  );
}
