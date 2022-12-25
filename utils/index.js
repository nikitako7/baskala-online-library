import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-spinner-animated';
import Book from '../components/Book/Book';
import NotFound from '../pages/404';

export const links = [
    {
        id: uuidv4(),
        title: "Яңалыклар",
        titleRu: "Новинки",
        titleTtlt: "Yanalikler",
        path: 'new'
    },
    {
        id: uuidv4(),
        title: "Популяр",
        titleRu: "Популярное",
        titleTtlt: "Populyar",
        path: '/popular'
    },
    {
        id: uuidv4(),
        title: "Авторлар",
        titleRu: "Авторы",
        titleTtlt: "Avtorlar",
        path: '/authors'
    },
];

export const genres = [
    {
        id: uuidv4(),
        title: 'Легкое чтение',
        items: [
            {
                id: uuidv4(),
                genre: 'Фантастика'
            },
            {
                id: uuidv4(),
                genre: 'Боевики, остросюжетная литература'
            },
            {
                id: uuidv4(),
                genre: 'Детективы'
            },
            {
                id: uuidv4(),
                genre: 'Фэнтези'
            },
        ]
    },
    {
        id: uuidv4(),
        title: 'Серьезное чтение',
        items: [
            {
                id: uuidv4(),
                genre: 'Современная проза'
            },
            {
                id: uuidv4(),
                genre: 'Об истории серьезно'
            },
            {
                id: uuidv4(),
                genre: 'Биографии и мемуары'
            },
            {
                id: uuidv4(),
                genre: 'Cтихи, поэзия'
            },
        ]
    },
    {
        id: uuidv4(),
        title: 'Бизнес-книги',
        items: [
            {
                id: uuidv4(),
                genre: 'О бизнесе популярно'
            },
            {
                id: uuidv4(),
                genre: 'Личная эффективность'
            },
            {
                id: uuidv4(),
                genre: 'Зарубежная деловая литература'
            },
            {
                id: uuidv4(),
                genre: 'Кадровый менеджмент'
            },
        ]
    }
];

export const options = [
    { value: 'татарский кириллица', label: 'tt' },
    { value: 'русский', label: 'ru' },
    { value: 'татарский латиница', label: 'tt-lt' },
];

export const createPage = (books, title) => {
    if (!books.length) return <NotFound />;
  
    return (
        <div className="page-content">
          <div className='book-list'>
            <h3 className='label'> { title } </h3>
              <InfiniteScroll
                dataLength={books.length}
                loader={<Spinner width="80px" height="80px" center={false} />}
              >
                <div className="list">
                  {books.map((book) => <Book key={book.sys.id} book={book} />)}
                </div>
              </InfiniteScroll>
          </div>
      </div>
    )
}