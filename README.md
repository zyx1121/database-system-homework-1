# Address Book

###### Database System Homework 1

Create two versions of web address book using IndexedDB and LocalStorage.

Try it out at [https://homework1.zhanyongxiang.com](https://homework1.zhanyongxiang.com).

## Features

- Add, edit, and delete contacts
- Search and sort contacts by name
- Export and import contacts (LocalStorage only)

## Screenshots

### IndexedDB Address Book

<img width="2416" alt="Screenshot 2025-02-26 at 1 38 50 AM" src="https://github.com/user-attachments/assets/1b96d790-7b30-4b55-a6e4-cf1e79bcc707" />

### LocalStorage Address Book

<img width="2416" alt="Screenshot 2025-02-26 at 1 39 10 AM" src="https://github.com/user-attachments/assets/119ccee0-f04a-4ab4-a5eb-cc510498ff90" />

### Add new contact

<img width="2416" alt="Screenshot 2025-02-26 at 1 40 08 AM" src="https://github.com/user-attachments/assets/9a049f82-583b-4037-a3f5-9b953c0edf64" />

## Storage Solutions Comparison

### IndexedDB

- Advantages:

  - Large storage capacity (no specific limit)
  - Support complex data structures and binary data
  - Asynchronous API for better performance
  - Support trading and indexing
  - Can handle multiple databases with version control

- Disadvantages:

  - More complex APIs and steeper learning curves
  - More settings codes are needed
  - Not applicable to simple key-value storage
  - Compatibility issues in the old version of the browser
  - Debugging can be challenging

But through [Dexie](https://dexie.org/), the shortcomings are less obvious.

### LocalStorage

- Advantages:

  - Easy-to-use API
  - Synchronous operation
  - Built-in browser support
  - Small-scale data is very suitable
  - String key value storage
  - No need to set

- Disadvantages:

  - Limited storage capacity (usually 5-10 MB)
  - Only supports string data (requires JSON serialization)
  - No native query function or index
  - Blocking operations may affect performance
  - There is no built-in error handling
  - Does not support structured queries

I don't think LocalStorage is suitable for making an address book.

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

## Development

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
