import { cva } from "class-variance-authority";

export const textInputVariants = cva(
  "placeholder:text-semibold-12 placeholder:text-neutral-text-weak focus:outline-none",
  {
    variants: {
      inputType: {
        default:
          "rounded-lg px-4 py-2 h-10 border border-transparent focus:border-neutral-border-default focus:bg-neutral-surface-default",
        textAreaOnly: "h-4 bg-transparent",
      },
      state: {
        enabled: "bg-neutral-surface-point",
        disabled:
          "cursor-default bg-neutral-surface-weak text-neutral-text-weak",
        error: "",
      },
    },

    compoundVariants: [
      {
        inputType: "default",
        state: "enabled",
        className: "bg-neutral-surface-point border-transparent",
      },
      {
        inputType: "default",
        state: "error",
        className: "bg-neutral-surface-default border-danger-border-default",
      },
    ],

    defaultVariants: {
      inputType: "default",
      state: "enabled",
    },
  },
);
