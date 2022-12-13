import { v4 as uuidv4 } from 'uuid';

export const links = [
    {
        id: uuidv4(),
        title: "Яңа",
        titleRu: "Новинки",
        titleTtlt: "New",
        path: 'new'
    },
    {
        id: uuidv4(),
        title: "Популяр",
        titleRu: "Популярное",
        titleTtlt: "Popular",
        path: '/popular'
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
    { value: 'русский', label: 'ru' },
    { value: 'татарский кириллица', label: 'tt' },
    { value: 'татарский латиница', label: 'tt-lt' },
];
