"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type TListItem = {
  label: string;
  value: any;
};

const SelectList = ({
  label,
  field,
  required,
  options,
}: {
  label: string;
  field: {
    name: string;
    value: any;
    onChange: (value: any) => void;
  };
  required?: boolean;
  options: Array<TListItem>;
}) => {
  return (
    <FormItem className="flex flex-col gap-2 mb-8">
      <FormLabel>
        {label}{" "}
        {required && <span className="text-required-field-color">*</span>}
      </FormLabel>
      <Select
        required={required}
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select Services" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default SelectList;
