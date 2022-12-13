import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux";
import styles from './Header.module.scss';
import { links, options } from '../../utils/index';
import { bookSelector, setFilters } from '../../store/appSlice';
import { Modal } from '../Modal/Modal';
import { Genres } from '../Genres/Genres';
import { languageSelector, setLanguage } from '../../store/languageSlice';

const genresHeaderAndFooter = {
  width: '100%',
  minHeight: '30px',
  backgroundColor: 'lightgray'
}

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState({id: '', title: ''});
  const [search, setSearch] = useState('');
  const books = useSelector(bookSelector);
  const curLanguage = useSelector(languageSelector);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const copyBooks = [...books];
    const findByTitle = copyBooks.filter(({ fields: { title } }) => title === search);
    const findByAuthor = copyBooks.find(
      ({ fields: { author: { fields: { fullName }}}}) => fullName === search);
    const findByTopic = copyBooks.filter(({ fields: { topic } }) => topic === search);

    if (search.trim() && findByTitle.length) {
      dispatch(setFilters([...findByTitle]))
    }

    if (search.trim() && findByAuthor) {
      router.push(`/authors/${findByAuthor.fields.author.fields.slug}`);
    }

    if (search.trim() && findByTopic.length) {
      dispatch(setFilters([...findByTopic]))
    }

    setSearch('');
    !findByAuthor && router.push('/search');
  }

  const onClickHandler = (id, title, titleRu, titleTtlt, path) => {
    const curTitle = (curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt);
    console.log(curTitle)
    setActiveLink({id, curTitle});
    if (path) router.push(path);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <Link href="/">
            <a>
              <figure onClick={() => setActiveLink({id: '', title: ''})}>
                <Image 
                  src='/static/img/baskala-logo.png' 
                  width={150} 
                  height={49}
                />
              </figure>
            </a>
          </Link>
          <div className={styles.header__searchBarContainer}>
            <form className={styles.header__searchBar} onSubmit={onSubmitHandler}>
                <Image 
                  src='/static/img/search-icon.svg' 
                  width={24} 
                  height={24}
                />
                <input 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  type="text" 
                  title='Searchbar' 
                  placeholder={(curLanguage === 'tt' && 'Титул, автор, тема буенча китап эзләгез') || (curLanguage === 'ru' && 'Искать книгу по названию, автору, теме') || (curLanguage === 'tt-lt' && 'Search for books by title, author, or subject')}
                />
            </form>
          </div>
          <nav className={styles.header__links}>
            <ul>
              {links.map(({id, title, titleRu, titleTtlt, path}) => (
                <li
                  className={activeLink.id === id ? styles.active : ''}
                  onClick={() => onClickHandler(id, title, titleRu, titleTtlt, path)}
                  key={id}
                >
                  {(curLanguage === 'tt' && title) || (curLanguage === 'ru' && titleRu) || (curLanguage === 'tt-lt' && titleTtlt)}
                </li>
              ))}
            </ul>
            <div className={styles.header__select}>
              <select name="languages" id="languages" onChange={(e) => {
                return dispatch(setLanguage(e.target.value));
            }}>
                {options.map(({value, label}) => (
                  <option key={value} value={label}>{label}</option>
                ))}
              </select>
            </div>
          </nav>
          <figure className={styles.header__burgerMenu}>
            { !open ? 
                <Image 
                  src='/static/img/hamburgerMenu.svg' 
                  width={30} height={30} 
                  onClick={() => setOpen(true)}
                /> : 
                <Image src='/static/img/closeButton.svg' 
                  width={30} height={30} 
                  onClick={() => setOpen(false)}
                />
            }
          </figure>
        </div>
      </header>
      {activeLink.title === 'Жанры' && <Genres activeLinkHandler={setActiveLink} />}
      { open && <Modal /> }
    </>
  )
}