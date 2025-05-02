import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GameFormValues } from "@/types/game";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

// Validation schema for the game form
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name cannot be more than 100 characters" }),
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .startsWith("http", { message: "URL must start with http:// or https://" }),
  author: z
    .string()
    .min(2, { message: "Author must be at least 2 characters long" }),
  publishedDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
});

interface GameFormProps {
  initialValues?: GameFormValues;
  onSubmit: (values: GameFormValues) => Promise<void>;
  isEditing: boolean;
}

const GameForm: React.FC<GameFormProps> = ({
  initialValues,
  onSubmit,
  isEditing,
}) => {
  const navigate = useNavigate();
//   const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default values for the form
  const defaultValues: GameFormValues = initialValues || {
    name: "",
    url: "",
    author: "",
    publishedDate: new Date().toISOString().split("T")[0],
  };

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<GameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Handle form submission
  const handleSubmit = async (values: GameFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    //   toast({
    //     title: "Success",
    //     description: isEditing
    //       ? "Game updated successfully!"
    //       : "Game created successfully!",
    //   });
      navigate("/");
    } catch (error) {
      console.error("Form submission error:", error);
    //   toast({
    //     title: "Error",
    //     description: isEditing
    //       ? "Failed to update game. Please try again."
    //       : "Failed to create game. Please try again.",
    //     variant: "destructive",
    //   });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter game name..." {...field} />
              </FormControl>
              <FormDescription>
                The name of the game (max 100 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/game" {...field} />
              </FormControl>
              <FormDescription>
                The website URL where the game can be found.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name..." {...field} />
              </FormControl>
              <FormDescription>
                The developer or company that created the game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Published Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                The date when the game was first published.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Game"
              : "Create Game"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GameForm;
