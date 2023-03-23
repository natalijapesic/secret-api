import classNames from "classnames";
import React from "react";
import styles from "./styles.module.css";

interface InputProps {
  icon?: React.ReactNode;
  variant?: "placeholder" | "border";
  type: "text" | "number" | "date" | "password";
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
