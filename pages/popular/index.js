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
  .map((element) => {
    for(let { id, count } of popularCount) {
      if (id === element.sys.id) {
        return {...element, count}
      }
    }
  }).sort((a, b) => b.count - a.count);

  useEffect(() => {
    let cancel = false;

    books.forEach( async(book) => {
      if (cancel) {
        return
      }
      const bookCount = await countapi.info(book.sys.id);
      if (bookCount.value) {
        dispatch(setPopularCount({id: book.sys.id, count: bookCount.value}))
        dispatch(setPopular(book));
      }
    });

    return () => { 
      cancel = true;
    }
  }, [])

  let popular = copybooks.filter(({ sys: { id } }, index, self) =>
    index === self.findIndex((t) => (
      t.sys.id === id
    ))
  )

  console.log(popular.slice(0, 15), 'popular.slice(0, 15)');
  
  const curLanguage = useSelector(languageSelector);
  const title = (curLanguage === 'tt' && 'Популяр') || (curLanguage === 'ru' && 'Популярное') || (curLanguage === 'tt-lt' && 'Populyar');

  return createPage(popular.slice(0, 15), title)
}