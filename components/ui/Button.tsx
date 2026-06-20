import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonElementProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonLinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
  };

export type ButtonProps = ButtonElementProps | ButtonLinkProps;

export default function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "ds-button",
    `ds-button-${variant}`,
    `ds-button-${size}`,
    className,
  );

  if ("href" in props && props.href) {
    const { href, prefetch, ...anchorProps } = props;
    const isNativeAnchor =
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isNativeAnchor) {
      return (
        <a {...anchorProps} className={classes} href={href}>
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorProps} className={classes} href={href} prefetch={prefetch}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonElementProps;

  return (
    <button
      {...buttonProps}
      className={classes}
      type={buttonProps.type ?? "button"}
    >
      {children}
    </button>
  );
}
