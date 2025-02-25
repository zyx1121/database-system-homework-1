import { Contact } from "@/lib/contact";

const STORAGE_KEY = "addressBook";

let currentId = 0;

export const localStorageDB = {
  contacts: {
    async toArray(): Promise<Contact[]> {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    },

    async add(contact: Omit<Contact, "id">): Promise<number> {
      const contacts = await this.toArray();
      const maxId = contacts.reduce(
        (max, contact) => Math.max(max, contact.id || 0),
        0
      );
      currentId = maxId + 1;
      const newContact = { ...contact, id: currentId };
      contacts.push(newContact);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      return currentId;
    },

    async update(id: number, contact: Partial<Contact>): Promise<void> {
      const contacts = await this.toArray();
      const index = contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        contacts[index] = { ...contacts[index], ...contact };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      }
    },

    async delete(id: number): Promise<void> {
      const contacts = await this.toArray();
      const filteredContacts = contacts.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredContacts));
    },

    async count(): Promise<number> {
      const contacts = await this.toArray();
      return contacts.length;
    },

    async bulkAdd(contacts: Omit<Contact, "id">[]): Promise<void> {
      const existingContacts = await this.toArray();
      const maxId = existingContacts.reduce(
        (max, contact) => Math.max(max, contact.id || 0),
        0
      );
      currentId = maxId;

      const newContacts = contacts.map((contact) => ({
        ...contact,
        id: ++currentId,
      }));

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...existingContacts, ...newContacts])
      );
    },

    async exportData(): Promise<string> {
      const contacts = await this.toArray();
      const blob = new Blob([JSON.stringify(contacts, null, 2)], {
        type: "application/json",
      });
      return URL.createObjectURL(blob);
    },

    async importData(file: File): Promise<void> {
      try {
        const text = await file.text();
        const contacts = JSON.parse(text);

        if (!Array.isArray(contacts)) {
          throw new Error("無效的數據格式");
        }

        const isValidContact = (contact: unknown): contact is Contact => {
          if (typeof contact !== "object" || contact === null) return false;
          const c = contact as Partial<Contact>;
          return (
            typeof c.name === "string" &&
            typeof c.phone === "string" &&
            typeof c.email === "string" &&
            typeof c.address === "string"
          );
        };

        if (!contacts.every(isValidContact)) {
          throw new Error("無效的聯絡人數據");
        }

        const contactsWithoutId = contacts.map((contact) => ({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address,
        }));

        await this.bulkAdd(contactsWithoutId);
      } catch (error) {
        throw new Error("導入失敗：" + (error as Error).message);
      }
    },

    async clear(): Promise<void> {
      localStorage.removeItem(STORAGE_KEY);
    },
  },
};
