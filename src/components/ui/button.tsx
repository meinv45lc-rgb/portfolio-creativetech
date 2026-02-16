import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      checked: {
        true: "bg-[#2e6be6] rounded-sm relative",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      checked: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  checked?: boolean;
  invisible?: boolean;
}

const EyeOffSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M17.2447 4L15.9117 5.33203C16.9872 6.09462 18.0043 7.12998 18.8316 8.50586C19.2481 9.19894 19.2438 10.0677 18.8218 10.7568C16.5159 14.5211 12.7817 15.7921 10.396 15.7812H10.3921C9.22806 15.7652 7.81691 15.497 6.41068 14.833L4.36771 16.877L3.67435 16.1836L16.5513 3.30664L17.2447 4ZM13.5669 7.67578C13.9 8.25112 14.0922 8.91829 14.0923 9.63086L14.0874 9.83301C13.9825 11.8995 12.2728 13.5429 10.1802 13.543L9.97904 13.5381C9.34183 13.5057 8.7451 13.3203 8.22416 13.0186L7.16752 14.0762C8.32057 14.5658 9.45696 14.7669 10.4029 14.7803C12.4867 14.789 15.8692 13.6607 17.9683 10.2344C18.1958 9.86268 18.1984 9.39364 17.9742 9.02051C17.1883 7.71354 16.215 6.74774 15.1929 6.05078L13.5669 7.67578ZM10.8736 3.5C11.7337 3.55881 12.7175 3.75887 13.7242 4.15234L12.9429 4.93359C12.0204 4.62282 11.1387 4.48884 10.398 4.48145C8.19504 4.50088 4.80656 5.67814 2.81009 9.03223C2.59241 9.39828 2.59426 9.85766 2.81498 10.2266C3.46535 11.3121 4.23668 12.1622 5.05814 12.8184L4.3472 13.5293C3.4715 12.8135 2.65084 11.8983 1.95755 10.7412C1.54963 10.0601 1.54269 9.20621 1.95072 8.52051C4.15793 4.81233 7.90604 3.50173 10.3941 3.48145H10.4029L10.8736 3.5ZM8.96732 12.2754C9.33685 12.4454 9.74687 12.5428 10.1802 12.543C11.7882 12.5429 13.0923 11.2388 13.0923 9.63086C13.0922 9.19749 12.9947 8.78752 12.8247 8.41797L8.96732 12.2754ZM10.1802 5.71973C10.7595 5.71975 11.3094 5.84624 11.8042 6.07227L11.0308 6.8457C10.7617 6.76369 10.476 6.71974 10.1802 6.71973C8.57285 6.7202 7.26953 8.0235 7.26908 9.63086C7.26908 9.92674 7.31284 10.2124 7.39505 10.4814L6.62259 11.2539C6.39635 10.7594 6.26909 10.2101 6.26908 9.63086C6.26953 7.47121 8.02057 5.7202 10.1802 5.71973Z" fill="#26334D"/>
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, checked = false, invisible = false, children, ...props }, ref) => {
    if (invisible) {
      return (
        <button
          type="button"
          className={cn(
            "w-5 h-5 flex items-center justify-center bg-transparent border-0 p-0",
            className
          )}
          ref={ref}
          {...props}
        >
          {EyeOffSVG}
        </button>
      );
    }
    const Comp = asChild ? Slot : "button";
    if (checked) {
      return (
        <Comp
          className={cn(
            "w-5 h-5 relative p-0 border-0 bg-transparent shadow-none",
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="w-5 h-5 left-0 top-0 absolute bg-[#2E6BE6] rounded-sm z-0" />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <path
              d="M4.64587 9.72082L6.62934 11.7481L8.61282 13.7754L15.555 6.67987"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Comp>
      );
    }
    // 非选中，保持原有样式
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, checked, className }))}
        ref={ref}
        {...props}
      >
        {children === undefined ? EyeOffSVG : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
