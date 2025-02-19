import { cn } from "@/lib/utils";

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "items-center overflow-hidden justify-items-center h-screen w-screen p-8 pb-20 gap-16 sm:p-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
