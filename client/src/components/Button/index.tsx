import styles from "./styles.module.css";
import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "info" | "borderless";
  iconPlacement?: "left" | "right";
  innerHTML: string;
}
const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      children,
      icon,
      iconPlacement,
      variant,
      disabled,
      innerHTML: text,
      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(
          styles["button"],
          styles[`button-${variant}`],
          styles[`button__icon-${iconPlacement}`],
          { [styles[`button--disabled`]]: disabled },
          props.className
        )}
      >
        {text}
        <React.Fragment>
          {icon}
          {children}
        </React.Fragment>
      </button>
    );
  }
);

export default Button;
