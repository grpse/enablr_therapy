"use client";

import React, { FC, ReactNode } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import Icon from "@/components/icon";

const RadioFormItem: FC<{
  label: string;
  value: any;
  field: {
    value: any;
  };
  icon?: ((checked: boolean) => ReactNode);
}> = ({ label, value, field, icon }) => {
  const checked = value === field.value;
  return (
    <FormItem
      className={cn(
        "rounded-full px-4 py-2 border-[1px] hover:cursor-pointer",
        {
          "bg-primary border-primary-foreground": checked,
        }
      )}
    >
      <FormControl>
        <RadioGroupItem value={value} className="hidden"></RadioGroupItem>
      </FormControl>
      <FormLabel
        className={cn(
          "flex flex-row gap-2 justify-center items-center hover:cursor-pointer",
          {
            "text-primary-foreground": checked,
          }
        )}
      >
        {icon && <span>{icon(checked)}</span>}
        <span>{label}</span>
      </FormLabel>
    </FormItem>
  );
};

export default RadioFormItem;
