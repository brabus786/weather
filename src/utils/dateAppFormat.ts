import dateFormat from 'dateformat';

/**
 * Formats a date according to the specified format with UTC and short period support
 * 
 * @param date - Date to format (Date object or string)
 * @param format - Output date format ('hh:MM TT' | 'mmmm dd, yyyy' | 'mmmm dd, h:MM:ss' | 'mmmm dd, yyyy, h:MM TT' | 'd mmm yyyy, h:MMtt' | 'd mmm yyyy / h:MM:sstt')
 * @param isShortPeriod - Show shortened format for recent dates (Today/Yesterday)
 * @param isUtc - Use UTC time instead of local time (default true)
 * @returns Formatted date string
 * 
 * @example
 * ```typescript
 * // Example with UTC (default)
 * dateAppFormat(new Date(), 'mmmm dd, yyyy', false);
 * 
 * // Example with local time
 * dateAppFormat(new Date(), 'mmmm dd, yyyy', false, false);
 * 
 * // Short period format
 * dateAppFormat(new Date(), 'mmmm dd, yyyy', true); // Returns "Today" or "Yesterday" if within 2 days. Than the date will be formatted as mask selected.
 * ```
 */
export const dateAppFormat = (
    date: Date | string,
    format: 'hh:MM TT' | 'mmmm dd, yyyy' | 'mmmm dd, h:MM:ss' | 'mmmm dd, yyyy, h:MM TT' | 'd mmm yyyy, h:MMtt' | 'd mmm yyyy / h:MM:sstt' | 'mm/dd/yyyy' | 'd mmm, yyyy' | 'mm/dd/yyyy h:MM TT',
    isShortPeriod: boolean,
    isUtc = true,
) => {
    const dateObject = date instanceof Date ? date : new Date(date);

    const now = new Date();
    const utcNow = isUtc
        ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
        : new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const targetDate = isUtc
        ? new Date(Date.UTC(
            dateObject.getUTCFullYear(),
            dateObject.getUTCMonth(),
            dateObject.getUTCDate()
        ))
        : new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());

    const diffDays = Math.floor((utcNow.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

    if (isShortPeriod) {
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        return dateFormat(dateObject, 'mmmm dd, yyyy', isUtc);
    }

    return dateFormat(dateObject, format, isUtc);
};