import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@utils';
import { buttonVariants } from '@components/shadcn/Button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'relative flex items-center justify-center pt-1',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center space-x-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal',
        row: 'mt-2 flex w-full',
        cell: cn(
          [
            `[&:has([aria-selected])]:bg-accent
            [&:has([aria-selected].day-outside)]:bg-accent/50 relative p-0
            text-center text-sm focus-within:relative focus-within:z-20
            [&:has([aria-selected].day-range-end)]:rounded-r-md`,
          ],
          props.mode === 'range'
            ? `[&:has(>.day-range-end)]:rounded-r-md
              [&:has(>.day-range-start)]:rounded-l-md
              first:[&:has([aria-selected])]:rounded-l-md
              last:[&:has([aria-selected])]:rounded-r-md`
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected: [
          `bg-primary text-primary-foreground hover:bg-primary
          hover:text-primary-foreground focus:bg-primary
          focus:text-primary-foreground`,
        ],
        day_today: 'bg-accent text-accent-foreground',
        day_outside: [
          `day-outside text-muted-foreground aria-selected:bg-accent/50
          aria-selected:text-muted-foreground opacity-50
          aria-selected:opacity-30`,
        ],
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
