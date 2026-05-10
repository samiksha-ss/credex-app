import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  isFullWidth?: boolean;
}

export function PageContainer({ children, className, isFullWidth = false }: PageContainerProps) {
  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full",
      !isFullWidth && "max-w-7xl",
      className
    )}>
      {children}
    </div>
  );
}
