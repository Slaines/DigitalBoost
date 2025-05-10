import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const cardVariants = cva(
  "bg-white rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md border-l-4",
  {
    variants: {
      variant: {
        default: "border-[#0055A4]",
        success: "border-emerald-500",
        warning: "border-amber-500",
        error: "border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const KPICard = ({ title, value, icon: Icon, trend, variant = 'default' }: KPICardProps) => {
  return (
    <div className={cardVariants({ variant })}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          
          {trend && (
            <div className="mt-1 flex items-center">
              <span className={`text-xs font-medium ${trend.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
              <svg
                className={`ml-1 h-3 w-3 ${trend.positive ? 'text-emerald-600' : 'text-red-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={trend.positive ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                />
              </svg>
              <span className="ml-1 text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="rounded-full bg-gray-50 p-2">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default KPICard;