import { Contact } from "@/lib/contact";
import Dexie, { Table } from "dexie";

export class AddressBookDB extends Dexie {
  contacts!: Table<Contact>;

  constructor() {
    super("AddressBookDB");
    this.version(1).stores({
      contacts: "++id, name, phone, email, address",
    });
  }
}

export const indexedDB = new AddressBookDB();
