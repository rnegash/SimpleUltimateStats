import Link from "next/link";

const variantClasses = {
  primary:
    "rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600",
  secondary:
    "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50",
  danger:
    "rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600",
} as const;

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  download?: string;
};

export const LinkButton = ({
  href,
  children,
  variant = "secondary",
  download,
}: Props) => (
  <Link href={href} download={download} className={variantClasses[variant]}>
    {children}
  </Link>
);
