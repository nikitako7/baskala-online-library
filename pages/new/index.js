import { createClient } from 'contentful';
import { createPage } from '../../utils/index';
import { useSelector } from "react-redux";
import { languageSelector } from '../../store/languageSlice';

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
  const curLanguage = useSelector(languageSelector);
  const title = (curLanguage === 'tt' && 'Яңалыклар') || (curLanguage === 'ru' && 'Новинки') || (curLanguage === 'tt-lt' && 'Yanalikler');

  return createPage(books, title);
}