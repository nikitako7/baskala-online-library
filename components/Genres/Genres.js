import React from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import { bookSelector, setFilters } from '../../store/appSlice';
import { genres } from '../../utils/index';
import styles from './Genres.module.scss';

const genresHeaderAndFooter = {
    width: '100%',
    minHeight: '30px',
    backgroundColor: 'lightgray'
};

export const Genres = ({ activeLinkHandler }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const books = useSelector(bookSelector);

  const onClickHandler = (genre) => {
    const copyBooks = [...books];
    const findByTopic = copyBooks.filter(({ fields: { topic } }) => topic === genre);

    if (genre && findByTopic.length) {
      dispatch(setFilters([...findByTopic]))
    }

    activeLinkHandler({id: '', title: ''})
    router.push('/search');
  }

  return (
    <section className={styles.genres}>
        <div style={genresHeaderAndFooter} />
        <div className={styles.genres__content}>
            {
              genres.map(({id, title, items}) => (
                <div className={styles.genre} key={id}>
                  <h4 className={styles.genres__title}>{title}</h4>
                  <div className={styles.genres__items}>
                    {!!items.length && items.map(({id: genreId, genre}) => (
                      <p key={genreId} onClick={() => onClickHandler(genre)}>{genre}</p>
                    ))}
                  </div>
                </div>
              ))
            }
        </div>
        <div style={genresHeaderAndFooter} />
    </section>
  )
}
