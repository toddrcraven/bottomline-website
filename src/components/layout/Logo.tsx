import Image from "next/image";

type LogoProps = {
  variant?: "full" | "fullDark" | "icon";
  className?: string;
  priority?: boolean;
};

const logoAssets = {
  full: {
    src: "/brand/bottom-line-erp-logo%20copy.png",
    width: 320,
    height: 96,
    sizes: "(max-width: 768px) 220px, 320px",
  },
  fullDark: {
    src: "/brand/bottom-line-erp-logo-dark.png",
    width: 220,
    height: 64,
    sizes: "(max-width: 768px) 180px, 220px",
  },
  icon: {
    src: "/brand/bottom-line-erp-icon-512.png",
    width: 48,
    height: 48,
    sizes: "48px",
  },
};

export function Logo({
  variant = "full",
  className,
  priority,
}: LogoProps) {
  const asset =
    variant === "icon"
      ? logoAssets.icon
      : variant === "fullDark"
        ? logoAssets.fullDark
        : logoAssets.full;

  return (
    <Image
      src={asset.src}
      alt="Bottom Line ERP logo"
      width={asset.width}
      height={asset.height}
      sizes={asset.sizes}
      priority={priority}
      className={className}
    />
  );
}
