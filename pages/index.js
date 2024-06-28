import { readBooks } from "../catalogue/readBooks";
import metadata from "../catalogue/metadata";

import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home({ books }) {
  return (
    <div>
      <h1>{metadata.name}</h1>
      <p>{metadata.description}</p>
      <ul>
        {books.map((book) => (
          <li>
            <a href={`/book/${book.id}`}>
              <img
                alt={`book cover for ${book.title}`}
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              />
              <p>{book.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const books = await readBooks();
  return {
    props: {
      books,
    },
  };
}
