import classNames from "classnames";
import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  icon?: React.ReactNode;
  variant?: "placeholder" | "border";
  type: "text" | "number" | "date" | "password" | "datetime-local";
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ value: initialValue, variant, icon, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      defaultValue={initialValue}
      autoComplete="off"
      className={classNames(
        styles[`input`],
        {
          [styles[`input-${variant}`]]: variant,
        },
        props.className
      )}
    />
  );
});
