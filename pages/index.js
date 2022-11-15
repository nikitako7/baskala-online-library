import { createClient } from 'contentful'; 
import Book from '../components/Book'
export async function getStaticProps(params) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY , 
  });

  const res =  await client.getEntries({ content_type: 'book' });

  return {
    props: {
      books: res.items,
    }
  }
}

export default function Books({ books  }) {
  return (
    <div className="book-list">
      {books.map( (book)  => (
         <Book key={book.sys.id} book={book} />
      ))}
    </div> 
  )
} 