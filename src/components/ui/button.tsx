import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<string, string> = {
      default: "bg-hue-600 text-white hover:bg-hue-500",
      outline: "border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
      ghost: "text-neutral-400 hover:text-white hover:bg-white/5",
    };

    const sizes: Record<string, string> = {
      default: "px-5 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-8 py-3 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
