import React, { FC } from "react";
import CheckboxChecked from "./checkbox-checked";
import CheckboxUnchecked from "./checkbox-unchecked";

const Checkbox: FC<{ color?: string; checked?: boolean }> = ({ color, checked }) => (
  checked
    ? <CheckboxChecked color={color} />
    : <CheckboxUnchecked color={color} />
);

export default Checkbox;