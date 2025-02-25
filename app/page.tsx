"use client";

import { IndexedDBAddressBook } from "@/components/indexed-db-address-book";
import { LocalStorageAddressBook } from "@/components/local-storage-address-book";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddressBookPage() {
  return (
    <main className="w-dvw h-dvh px-8 py-16 flex flex-col items-center justify-center">
      <Tabs defaultValue="IndexedDB" className="max-w-screen-lg w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="IndexedDB">IndexedDB</TabsTrigger>
          <TabsTrigger value="localStorage">LocalStorage</TabsTrigger>
        </TabsList>
        <TabsContent value="IndexedDB" className="mt-0">
          <IndexedDBAddressBook />
        </TabsContent>
        <TabsContent value="localStorage" className="mt-0">
          <LocalStorageAddressBook />
        </TabsContent>
      </Tabs>
    </main>
  );
}
