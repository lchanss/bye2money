import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center rounded-md hover:opacity-80 disabled:opacity-32 active:opacity-64",
  {
    variants: {
      buttonType: {
        container: "bg-grayscale-300 text-grayscale-50",
        outline: "border-grayscale-300 text-grayscale-300 ",
        ghost: "",
      },
      size: {
        small: "text-semibold-12 gap-1",
        medium: "text-semibold-16 gap-2",
        large: "text-serif-48 gap-2",
      },
      flexible: {
        true: "w-fit",
        false: "w-full",
      },
      color: {
        default: "",
        danger: "",
      },
    },

    compoundVariants: [
      {
        buttonType: "ghost",
        color: "default",
        className: "text-neutral-text-default",
      },
      {
        buttonType: "ghost",
        color: "danger",
        className: "text-danger-text-default",
      },
    ],

    defaultVariants: {
      buttonType: "ghost",
      size: "medium",
      flexible: true,
      color: "default",
    },
  },
);

export const iconVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      color: {
        default: "bg-neutral-text-default",
        danger: "bg-danger-surface-default",
      },
      size: {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-10 h-10",
      },
    },

    defaultVariants: {
      color: "default",
      size: "medium",
    },
  },
);
