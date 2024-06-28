import { readBooks } from "../../catalogue/readBooks";
import { useParams } from "next/navigation";

export default function Book({ book }) {
  console.log("book", book);
  return (
    <>
      <h1>{book.title}</h1>
      <figure>
        <img
          alt="book cover image"
          src={`https://covers.openlibrary.org/b/isbn/${book.isbn}`}
        />
        <figcaption>
          Cover images provided by{" "}
          <a href="https://openlibrary.org/">openlibrary.org</a>
        </figcaption>
      </figure>
      <table>
        <tbody>
          <tr>
            <td>Author</td>
            <td>{book.author}</td>
          </tr>
          <tr>
            <td>Summary</td>
            <td>{book.summary}</td>
          </tr>
          <tr>
            <td>ISBN</td>
            <td>{book.isbn}</td>
          </tr>
        </tbody>
      </table>
      <a href="/">Back to catalogue</a>
    </>
  );
}

export async function getStaticPaths() {
  const books = await readBooks();

  const paths = books.map((book) => ({
    params: { id: book.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const books = await readBooks();
  return {
    props: {
      book: books.find((book) => book.id === params.id),
    },
  };
}
