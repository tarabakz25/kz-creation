export function formatDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  
  const d = new Date(date).toLocaleDateString('en-US', options);
  return d;
}