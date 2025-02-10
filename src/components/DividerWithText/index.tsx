import { FC } from 'react';

interface Props {
  text: string;
  className?: string;
  lineColor?: string;
}

export const DividerWithText: FC<Props> = ({ 
  text, 
  className = '',
  lineColor = 'border-gray-300' 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <hr className={`flex-grow border-t-1 ${lineColor}`} />
      <span className="mx-4 text-sm text-gray-500 font-medium">{text}</span>
      <hr className={`flex-grow border-t-1 ${lineColor}`} />
    </div>
  );
};
