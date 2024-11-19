import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const getTimeStamp = (createdAt: Date | string): string => {
//   const now = new Date();
//   const createdDate = new Date(createdAt);
//   const timeDifference = now.getTime() - createdDate.getTime();

//   // Define time intervals in milliseconds
//   const minute = 60 * 1000;
//   const hour = 60 * minute;
//   const day = 24 * hour;
//   const week = 7 * day;
//   const month = 30 * day;
//   const year = 365 * day;

//   if (timeDifference < minute) {
//     const seconds = Math.floor(timeDifference / 1000);
//     return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
//   } else if (timeDifference < hour) {
//     const minutes = Math.floor(timeDifference / minute);
//     return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
//   } else if (timeDifference < day) {
//     const hours = Math.floor(timeDifference / hour);
//     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
//   } else if (timeDifference < week) {
//     const days = Math.floor(timeDifference / day);
//     return `${days} ${days === 1 ? 'day' : 'days'} ago`;
//   } else if (timeDifference < month) {
//     const weeks = Math.floor(timeDifference / week);
//     return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
//   } else if (timeDifference < year) {
//     const months = Math.floor(timeDifference / month);
//     return `${months} ${months === 1 ? 'month' : 'months'} ago`;
//   } else {
//     const years = Math.floor(timeDifference / year);
//     return `${years} ${years === 1 ? 'year' : 'years'} ago`;
//   }
// };
export const getTimeStamp = (createdAt: Date): string => {
  const now: Date = new Date();
  const timeDifference: number = now.getTime() - createdAt.getTime();

  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
};



interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true})
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
  { skipNull: true})
}


export const getLocation = async (latitude:string, longitude:string) => {
  const apiSecret = process.env.NEXT_PUBLIC_LOCATION_API_SECRET;
  console.log(apiSecret,'j')
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${longitude}&lon=${latitude}&apiKey=${apiSecret}`;

  try {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    const result = await response.json();
    
    const location = result.features[0].properties;
    

    const locationDetails = {
      city: location.city,
      country: location.country,
      state: location.state,
      address: location.address_line2, // Full address from address_line2
      street: location.street, // Street name
    };

    // Log the extracted location details
    console.log(locationDetails);

    // Optionally, you can return the result if you want to use it elsewhere
    return locationDetails;
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};
