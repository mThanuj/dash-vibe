"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTodoSchema } from "@/schemas/CreateTodoSchema";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo } from "@/actions/todo.actions";
import { useSession } from "@clerk/nextjs";

const CreateTodoForm = () => {
  const { session, isLoaded } = useSession();

  const form = useForm<z.infer<typeof CreateTodoSchema>>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateTodoSchema>) => {
    const response = await createTodo(data, session!.user.id);

    if (response.error) {
      console.log(response.error);
    }

    if (response.success) {
      console.log(response.success);
      form.reset();
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md bg-white shadow-md rounded-xl p-6 mt-6 mx-3 sm:mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Todo</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTodoForm;
