export interface IRestaurant {
  name: string;
  categories: Category[];
  shortDescription: string;
  mainPhoto: string;
  address: IRestaurantAddress;
  contactInfo: IRestaurantContactInfo;
  location: {
    lat: number;
    lng: number;
  };
  openingHours: []; // calendar interface @@@
  about?: {
    longDescription?: string;
    menus: IRestaurantMenu[];
    photos: string[];
    reservations: IReservation[];
  };
}

export type Category = "italian" | "meat" | "greek" | "fish";

export interface IReservation {
  guestsNumber: number;
  guestInfo: IGuestInfo;
  reservationTimeData: {
    date: string;
    hour: string;
  };
  tablePlace: "inside" | "outside" | "bar" | "no preference";
  notes?: string;
}

export interface IGuestInfo {
  guestFirstName: string;
  guestLastName: string;
  phoneNumber: string;
  email?: string;
}

export interface IRestaurantMenu {
  title: string;
  menuUrl: string; // renamed for clarity
}

export interface IRestaurantAddress {
  country: string;
  city: string;
  street: string;
  number: number;
}

export interface IRestaurantContactInfo {
  phoneNumber?: string;
  websiteURL?: string;
  instagram?: string; // corrected type
  facebook?: string;
}
