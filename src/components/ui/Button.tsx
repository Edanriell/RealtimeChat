import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { motion, MotionProps } from "framer-motion";

export const buttonVariants = cva(
	"active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-slate-50 text-black",
				ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-2",
				lg: "h-11 px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const Button: FC<ButtonProps & MotionProps> = ({
	className,
	children,
	variant,
	isLoading,
	size,
	...props
}) => {
	return (
		<motion.button
			whileHover={{ scale: 1.05, backgroundColor: "#E2E8f0" }}
			whileTap={{ scale: 0.95, backgroundColor: "#E2E8f0"}}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
			{children}
		</motion.button>
	);
};

export default Button;
