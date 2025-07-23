import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-auto cursor-pointer flex-col items-center gap-1 rounded-md p-2',
        className
      )}
      onClick={onClick}>
      <Icon className='text-white' size={20} />
      <span className='text-xs text-white'>{label}</span>
    </div>
  );
};
