import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import styles from './Header.module.scss';
import { links, options, genres } from '../../utils/index';
import { bookSelector, setFilters } from '../../store/appSlice';

const genresHeaderAndFooter = {
  width: '100%',
  minHeight: '30px',
  backgroundColor: 'lightgray'
}

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState({id: '', title: ''});
  const [search, setSearch] = useState('');
  const books = useSelector(bookSelector);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const copyBooks = [...books];
    const findByTitle = copyBooks.filter(({ fields: { title } }) => title === search);
    const findByAuthor = copyBooks.filter(
      ({ fields: { author: { fields: { fullName }}}}) => fullName === search);
    const findByTopic = copyBooks.filter(({ fields: { topic } }) => topic === search);
    
    if (search.trim() && findByTitle.length) {
      dispatch(setFilters([...findByTitle]))
    }

    if (search.trim() && findByAuthor.length) {
      dispatch(setFilters([...findByAuthor]))
    }

    if (search.trim() && findByTopic.length) {
      dispatch(setFilters([...findByTopic]))
    }

    setSearch('');
    router.push('/search');
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
        <Link href="/">
          <a>
            <figure>
              <Image src='/static/img/baskala-logo.png' width={150} height={49}/>
            </figure>
          </a>
        </Link>
        <div className={styles.header__searchBarContainer}>
          <form className={styles.header__searchBar} onSubmit={onSubmitHandler}>
              <Image src='/static/img/search-icon.svg' width={24} height={24}/>
              <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" 
                title='Searchbar' 
                placeholder='Искать книгу по названию, авторе, теме' 
              />
          </form>
        </div>
        <nav className={styles.header__links}>
          <ul>
            {links.map(({id, title}) => (
              <li
                className={activeLink.id === id ? styles.active : ''}
                onClick={() => setActiveLink({id, title})}
                key={id}
              >
                {title}
              </li>
            ))}
          </ul>
          <div className={styles.header__select}>
          <select name="languages" id="languages">
            {options.map(({value, label}) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        </nav>
        </div>
      </header>
      {activeLink.title === 'Жанры' && (
        <section className={styles.genres}>
        <div style={genresHeaderAndFooter} />
        <div className={styles.genres__content}>
          {
            genres.map(({id, title, items}) => (
              <div className={styles.genre} key={id}>
                <h4 className={styles.genres__title}>{title}</h4>
                <div className={styles.genres__items}>
                  {!!items.length && items.map(({id: genreId, genre}) => (
                    <p key={genreId}>{genre}</p>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
        <div style={genresHeaderAndFooter} />
      </section>
      )}
    </>
  )
}