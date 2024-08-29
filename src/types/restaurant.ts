// export interface IRestaurant {
//   _Id?: string;
//   name: string;
//   categories: string[];
//   shortDescription: string;
//   mainPhoto: string;
//   address: IRestaurantAddress;
//   contactInfo: IRestaurantContactInfo;
//   location: {
//     lat: number;
//     lng: number;
//   };
//   openingHours: IOpeningHours[]; // calendar interface @@@
//   about?: {
//     longDescription?: string;
//     menus: IRestaurantMenu[];
//     photos: string[];
//     reservations: IReservation[];
//   };
//   tables: ITable[];
// }
// export interface IOpeningHours {
//   day: string;
//   open: string;
//   close: string;
// }

// export interface IReservation {
//   _id?: string;
//   partySize: number;
//   guestInfo: IGuestInfo;
//   reservationTime: Date;
//   position: string;
//   notes?: string;
// }
// export interface ITable {
//   _id?: string;
//   position: string;
//   partySize: number;
//   reservations: IReservation[];
// }
// export interface IGuestInfo {
//   guestFirstName: string;
//   guestLastName: string;
//   phoneNumber: string;
//   email?: string;
// }

// export interface IRestaurantMenu {
//   title: string;
//   menuUrl: string;
// }

// export interface IRestaurantAddress {
//   country: string;
//   city: string;
//   street: string;
//   number: number;
// }

// export interface IRestaurantContactInfo {
//   phoneNumber?: string;
//   websiteURL?: string;
//   instagram?: string;
//   facebook?: string;
// }

export interface IRestaurant {
  restId: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  category: string;
  mainPhoto: string;
  phoneNumber: string;
  website: string;
  instagram: string;
  facebook: string;
  shortDescription: string;
  longDescription: string;
  menus: {
    url: string;
    title: string;
  }[];
  photos: string[];
  openingHours: {
    sunday?: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
  }[];
}
export interface IOpeningHours {
  id?: number; // Primary key in the SQL structure
  restId: number; // Foreign key reference to `Restaurants`
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
  date: Date;
}

export interface ITable {
  tableId?: number; // Matches the AUTO_INCREMENT primary key from SQL
  restId: number; // Foreign key reference to `Restaurants`
  position: string; // E.g., 'inside', 'outside'
  capacity: number; // Number of guests the table can accommodate
}

export interface IRestaurantMenu {
  menuId?: number; // Matches the AUTO_INCREMENT primary key from SQL
  restId: number; // Foreign key reference to `Restaurants`
  title: string; // E.g., 'Dinner Menu'
  url: string; // URL to the menu
}
export interface IRestaurantPhoto {
  photoId?: number; // Matches the AUTO_INCREMENT primary key from SQL
  restId: number; // Foreign key reference to `Restaurants`
  url: string; // URL to the photo
}

export interface availabileTablesByRestaurant {
  distance_in_km: number;
  given_hour: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
  };
  half_hour_after: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
  };
  half_hour_before: {
    bar: number | null;
    inside: number;
    outside: number;
    available: number;
  };
  rest_address: string;
  rest_id: number;
  rest_name: string;
  restaurant_mainphoto: string;
}
