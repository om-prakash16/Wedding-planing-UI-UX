import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary:
                "bg-wedding-gold text-white hover:bg-wedding-gold-dark shadow-md active:scale-95 transition-all duration-200",
            secondary:
                "bg-wedding-blush text-wedding-maroon hover:bg-opacity-80 active:scale-95 transition-all duration-200",
            outline:
                "border-2 border-wedding-gold text-wedding-gold-dark hover:bg-wedding-gold hover:text-white transition-all duration-200",
            ghost: "text-wedding-slate hover:bg-wedding-blush/30 hover:text-wedding-maroon",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-6 text-sm",
            lg: "h-12 px-8 text-base",
            icon: "h-10 w-10 p-2 flex items-center justify-center",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-serif font-medium focus:outline-none focus:ring-2 focus:ring-wedding-gold/50 disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
