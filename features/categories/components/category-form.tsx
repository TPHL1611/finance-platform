"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCategorySchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const CategoryForm = ({ id, defaultValues, onDelete, onSubmit, disabled }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={disabled} placeholder="..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button disabled={disabled} className="w-full">
                    {id ? "Save changes" : "Create category"}
                </Button>
                {!!id && (
                    <Button
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full gap-x-2"
                        variant="outline">
                        <Trash className="w-4 h-4" />
                        Delete category
                    </Button>
                )}
            </form>
        </Form>
    );
};
