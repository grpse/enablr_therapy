"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import React, { FC, ReactNode} from "react";
import RadioFormItem from "@/components/design-system/radio-form-item";

type TOptionConfig = {
  label: string;
  value: any;
  icon?: ((checked: boolean) => ReactNode);
};

const RadioGroupOptions = ({
  label,
  options,
  field,
  required,
}: {
  label: string;
  options: Array<TOptionConfig>;
  field: {
    name: string;
    value: any;
    onChange: (value: any) => void;
  }
  required?: boolean;
}) => (
  <FormItem className="flex flex-col gap-2 mb-8">
    <FormLabel>{label} {required && <span className="text-required-field-color">*</span>}</FormLabel>
    <FormControl className="flex flex-row gap-2 items-center">
      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
        {options.map((option) => (
          <RadioFormItem
            key={`${field.name}-${option.value}`}
            label={option.label}
            value={option.value}
            field={field}
            icon={option.icon}
          />
        ))}
      </RadioGroup>
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default RadioGroupOptions;