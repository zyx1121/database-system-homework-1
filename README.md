# Address Book

###### Database System Homework 1

Create two versions of address book using IndexedDB and LocalStorage.

## Features

- Add, edit, and delete contacts
- Search and sort contacts by name
- Export and import contacts (LocalStorage only)

## Structure

```bash
database-system-homework-1/
├── app/
│   ├── layout.tsx # Layout
│   └── page.tsx # Main page
├── components/
│   ├── contact-form-dialog.tsx # Contact form dialog
│   ├── indexed-db-address-book.tsx # IndexedDB address book application logic
│   └── local-storage-address-book.tsx # LocalStorage address book application logic
├── lib/
│   ├── contact.ts # Contact type and default contacts
│   ├── indexed-db.ts # IndexedDB business logic
│   └── local-storage.ts # LocalStorage business logic
├── package.json # Package manager
└── README.md # README
```

## Usage

> [!NOTE]
> Requires Node.js v20 or higher.

1. Clone the repository.

   ```bash
   git clone https://github.com/zyx1121/database-system-homework-1.git
   cd database-system-homework-1
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Run the development server.

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Reference

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Dexie](https://dexie.org/)
