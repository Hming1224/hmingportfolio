import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  loadingLabel?: string;
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
  loading = false,
  loadingLabel = "Loading",
  ...props
}: ButtonProps) {
  const classes = cn(
    "ds-button",
    `ds-button-${variant}`,
    `ds-button-${size}`,
    loading && "is-loading",
    className,
  );
  const content = (
    <span className="ds-button-content">
      {loading ? <Loader2 aria-hidden="true" className="ds-button-spinner" size={18} strokeWidth={2} /> : null}
      <span>{loading ? loadingLabel : children}</span>
    </span>
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
          {content}
        </a>
      );
    }

    return (
      <Link {...anchorProps} className={classes} href={href} prefetch={prefetch}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonElementProps;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={classes}
      disabled={loading || buttonProps.disabled}
      type={buttonProps.type ?? "button"}
    >
      {content}
    </button>
  );
}
