import { readBooks } from "../../catalogue/readBooks";
import CatalogueHead from "../../components/CatalogueHead";
import Footer from "../../components/Footer";

export default function Book({ book }) {
  return (
    <div className="container">
      <main>
        <CatalogueHead />
        <h1>{book.title}</h1>
        <figure>
          <img
            alt={`book cover for ${book.title}`}
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
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
      </main>
      <Footer />
    </div>
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
