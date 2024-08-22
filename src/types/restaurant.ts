export interface IRestaurant {
  _Id?: string;
  name: string;
  categories: string[];
  shortDescription: string;
  mainPhoto: string;
  address: IRestaurantAddress;
  contactInfo: IRestaurantContactInfo;
  location: {
    lat: number;
    lng: number;
  };
  openingHours: IOpeningHours[]; // calendar interface @@@
  about?: {
    longDescription?: string;
    menus: IRestaurantMenu[];
    photos: string[];
    reservations: IReservation[];
  };
  tables: ITable[];
}
export interface IOpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface IReservation {
  _id?: string;
  partySize: number;
  guestInfo: IGuestInfo;
  reservationTime: Date;
  position: string[];
  notes?: string;
}
interface ITable {
  tableId: string;
  position: string;
  partySize: number;
  reservations: IReservation[];
}
export interface IGuestInfo {
  guestFirstName: string;
  guestLastName: string;
  phoneNumber: string;
  email?: string;
}

export interface IRestaurantMenu {
  title: string;
  menuUrl: string;
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
  instagram?: string;
  facebook?: string;
}
