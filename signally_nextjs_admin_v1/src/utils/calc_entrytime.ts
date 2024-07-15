export function calcentrytime(time: Date | null): Date | null {
    if ( !time) return null;
      // Create a new Date object based on entryDateTime
      const newDate = new Date(time.getTime());
      // Add 2 minutes to the date
      newDate.setMinutes(newDate.getMinutes() + 2);
      // Return the new date
      return newDate;
  
  }
  