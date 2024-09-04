export interface ILocation {
  lat: number;
  lng: number;
}
export interface IRestaurant {
  restId: number;
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
  category?: string;
  mainPhoto?: string;
  phoneNumber?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  shortDescription?: string;
  longDescription?: string;
  menus?: {
    url: string;
    title: string;
  }[];
  photos?: string[];
  openingHours?: IOpeningHours[];
}

export interface IOpeningHours {
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
}

export interface IReservation {
  reservationId?: number; // Made optional for cases where it's auto-generated
  tableId?: number; // Made optional if it’s determined later
  restId: number;
  partySize: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  notes?: string;
  date: string;
}

export interface ITable {
  tableId?: number; // Matches the AUTO_INCREMENT primary key from SQL
  restId: number; // Foreign key reference to `Restaurants`
  position: string; // E.g., 'inside', 'outside'
  capacity: number; // Number of guests the table can accommodate
}

// export interface IRestaurantMenu {
//   menuId?: number; // Matches the AUTO_INCREMENT primary key from SQL
//   restId: number; // Foreign key reference to `Restaurants`
//   title: string; // E.g., 'Dinner Menu'
//   url: string; // URL to the menu
// }

export interface IRestaurantPhoto {
  photoId?: number; // Matches the AUTO_INCREMENT primary key from SQL
  restId: number; // Foreign key reference to `Restaurants`
  url: string; // URL to the photo
}

export interface AvailableTablesByRestaurant extends IRestaurant {
  distance_in_km: number;
  given_hour: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
    time: string;
  };
  half_hour_after: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
    time: string;
  };
  half_hour_before: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
    time: string;
  };
}

export interface TimeSlot {
  label: string;
  data?: {
    available: number;
    time: string;
    [key: string]: any;
  };
}

export interface IRestaurantReservation {
  position: string;
  category: string;
  date: string; // ISO 8601 date string
  email: string;
  facebook: string;
  firstName: string;
  instagram: string;
  lastName: string;
  longDescription: string;
  mainPhoto: string;
  notes: string;
  opening_hours: {
    [key: string]: string; // e.g., { monday: '08:00-23:00', ... }
  };
  partySize: number;
  phoneNumber: string;
  reservationId: number;
  restId: number;
  restaurant_address: string;
  restaurant_lat: number;
  restaurant_lng: number;
  restaurant_name: string;
  shortDescription: string;
  tableId: number;
  website: string;
}
