import styles from "./styles.module.css";
import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  iconPlacement?: "left" | "right";
}
const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, icon, iconPlacement, variant, disabled, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        styles["button"],
        styles[`button-${variant}`],
        { [styles[`button--disabled`]]: disabled },
        props.className
      )}
    >
      {children}
    </button>
  );
});

export default Button;
