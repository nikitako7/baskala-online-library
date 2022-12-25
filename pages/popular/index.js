import { useEffect } from 'react';
import { createClient } from 'contentful';
import { createPage } from '../../utils/index';
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from '../../store/languageSlice';
import { popularSelector, setPopular, popularCountSelector, setPopularCount } from '../../store/appSlice';
import countapi from 'countapi-js';

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
  const dispatch = useDispatch();
  const popularBooks = useSelector(popularSelector);
  const popularCount = useSelector(popularCountSelector);
  const copybooks = [...popularBooks]
  .filter((element) => {
    for(let { id, count } of popularCount) {
      if (element.sys.id === id) {
        return element
      }
    }
  });

  useEffect(() => {
    books.forEach(async (book) => {
      const bookCount = await countapi.info(book.sys.id);
      console.log(bookCount);
      if (bookCount.value) {
        dispatch(setPopularCount({id: book.sys.id, count: bookCount.value}))
        dispatch(setPopular(book));
      }
    });
  }, [])

  let popular = copybooks.filter(({ sys: { id } }, index, self) =>
    index === self.findIndex((t) => (
      t.sys.id === id
    ))
  )
  
  const curLanguage = useSelector(languageSelector);
  const title = (curLanguage === 'tt' && 'Популяр') || (curLanguage === 'ru' && 'Популярное') || (curLanguage === 'tt-lt' && 'Populyar');

  return createPage(popular.slice(0, 15), title)
}