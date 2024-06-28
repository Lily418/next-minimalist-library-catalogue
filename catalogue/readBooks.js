import { ISO2709 } from "@natlibfi/marc-record-serializers";
import fs from "fs";
import { decode } from "html-entities";

function getTag(record, tagCode, subfield = null) {
  const tag = record.fields.filter((field) => field.tag === tagCode)[0];
  if (subfield === null) {
    return tag?.value ?? null;
  } else {
    return (
      decode(
        tag?.subfields.filter((sub) => sub.code === subfield)[0]?.value
      ).replace(/\/$/, "") ?? null
    );
  }
}

export async function readBooks() {
  return new Promise((resolve, reject) => {
    const books = [];

    const reader = ISO2709.reader(
      fs.createReadStream(`${process.cwd()}/catalogue/catalogue.marc`)
    );
    reader.on("data", (record) => books.push(record));

    reader.on("error", (error) => console.error(error));

    reader.on("end", () => {
      resolve(
        books.map((book) => {
          const bookSummary = {
            id: getTag(book, "001"),
            isbn: getTag(book, "020", "a"),
            title: `${getTag(book, "245", "a")}${getTag(book, "245", "b")}`,
            author: `${getTag(book, "100", "a")}`,
            summary: getTag(book, "520", "a"),
          };
          console.log(bookSummary);
          return bookSummary;
        })
      );
    });
  });
}
