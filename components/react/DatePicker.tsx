import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import type { FlatpickrConfig } from '../../types';

// Import Flatpickr styles
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  value?: string | Date;
  onChange?: (date: string | Date | null) => void;
  config?: FlatpickrConfig;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  config = {
    dateFormat: 'Y-m-d',
    enableTime: false,
    time_24hr: true
  },
  placeholder = 'Select date',
  className = '',
  disabled = false,
  required = false,
  name = 'date'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const flatpickrInstance = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (inputRef.current && !flatpickrInstance.current) {
      flatpickrInstance.current = flatpickr(inputRef.current, {
        ...config,
        onChange: (selectedDates, dateStr) => {
          if (onChange) {
            onChange(selectedDates.length > 0 ? selectedDates[0] : null);
          }
        },
        onReady: () => {
          // Customize the appearance
          const calendar = document.querySelector('.flatpickr-calendar');
          if (calendar) {
            calendar.classList.add('dark-theme');
          }
        }
      });
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
        flatpickrInstance.current = null;
      }
    };
  }, [config, onChange]);

  useEffect(() => {
    if (flatpickrInstance.current && value) {
      flatpickrInstance.current.setDate(value);
    }
  }, [value]);

  return (
    <div className={`date-picker-wrapper ${className}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        name={name}
        className="w-full px-4 py-3 bg-primary-bg/50 border border-accent-blue/20 rounded-lg text-white placeholder-gray-400 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all duration-300"
        data-input
      />
    </div>
  );
};

export default DatePicker;
