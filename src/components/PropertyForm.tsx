
import { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export type PropertyFormData = {
  id?: number;
  title: string;
  location: string;
  type: string;
  price: string;
  image: string;
  description?: string;
  beds?: number;
  baths?: number;
  guests?: number;
  amenities?: string[];
  rating?: number;
  featured?: boolean;
}

export type FormField = {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
}

interface PropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PropertyFormData | any) => void;
  property?: PropertyFormData | any;
  title: string;
  fields?: FormField[];
}

export function PropertyForm({ 
  open, 
  onOpenChange, 
  onSubmit, 
  property, 
  title,
  fields 
}: PropertyFormProps) {
  const { toast } = useToast();
  const form = useForm<PropertyFormData | any>({
    defaultValues: property || {
      title: "",
      location: "",
      type: "",
      price: "",
      image: "",
      description: "",
      beds: 0,
      baths: 0,
      guests: 0,
      amenities: [],
      featured: false
    },
  });

  const handleSubmit = (data: PropertyFormData | any) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
    toast({
      title: "Success",
      description: property ? "Property updated successfully" : "Property added successfully",
    });
  };

  // Use provided fields or default to property fields
  const formFields = fields || [
    { name: "title", label: "Title", required: true },
    { name: "location", label: "Location", required: true },
    { name: "type", label: "Type", required: true },
    { name: "price", label: "Price", required: true, type: "number" },
    { name: "image", label: "Image URL", required: true },
    { name: "description", label: "Description" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Fill in the details below to {property ? "update" : "create"} a property.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          {...formField}
                        />
                      ) : (
                        <Input
                          type={field.type || "text"}
                          placeholder={field.label}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          required={field.required}
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
