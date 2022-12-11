import { createClient } from 'contentful';
import { createPage } from '../../utils/index';

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

export default ({ books }) => {
  const newBooks = books.filter((book) => book?.fields?.tags?.includes('New'));

  return createPage(newBooks, 'Новинки');
}