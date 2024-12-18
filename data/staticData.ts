// data/staticData.ts

export type AccountType = 'HelpSeeker' | 'ReadyToHelp' | 'Moderator' | 'Admin';

export interface User {
    id: number;
    username: string;
    password: string;
    accountType: AccountType;
}

export const testUsers: User[] = [
    {
        id: 1,
        username: 'helpseeker1',
        password: 'password1',
        accountType: 'HelpSeeker',
    },
    {
        id: 2,
        username: 'readytohelp1',
        password: 'password2',
        accountType: 'ReadyToHelp',
    },
    {
        id: 3,
        username: 'moderator1',
        password: 'password3',
        accountType: 'Moderator',
    },
    {
        id: 4,
        username: 'admin1',
        password: 'password4',
        accountType: 'Admin',
    },
];

// Sample blog posts with real images (Ukrainian version)
export interface BlogPost {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    category?: string;
    author: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Як допомогти людям з обмеженими можливостями під час війни",
        content: "Дізнайтеся про способи підтримки та допомоги людям з обмеженими можливостями в Україні.",
        imageUrl: "https://www.ukrainer.net/wp-content/uploads/2022/07/3-3.jpg",
        category: "Рекомендації",
        author: "Олена",
        readTime: "5 хв",
    },
    {
        id: 2,
        title: "Місця для спокійного відпочинку людей з інвалідністю в Україні",
        content: "Дослідіть місця, які пропонують зручності для людей з інвалідністю.",
        imageUrl: "https://cf.bstatic.com/static/img/theme-index/bg_accessible_traveling/f05acdf9b704c56367fb9c8ce1999f0682ed0d8b.jpg",
        category: "Рекомендації",
        author: "Микола",
        readTime: "6 хв",
    },
    {
        id: 3,
        title: "Психологічна підтримка під час кризи: поради та ресурси",
        content: "Важливі рекомендації для тих, хто шукає емоційну підтримку.",
        imageUrl: "https://glavcom.ua/img/forall/users/187/18756/aa4ee807-880e-4049-9117-cd884cae1c96.jpg",
        category: "Топ",
        author: "Ірина",
        readTime: "7 хв",
    },
    {
        id: 4,
        title: "Як надати гуманітарну допомогу переселенцям",
        content: "Практичні поради для організації допомоги людям, які залишили свої домівки.",
        imageUrl: "https://visitukraine.today/media/blog/previews/R4Atdoiz1SCFV1FEaSBnQILMq3kgVAUdYIZgEJL3.jpg",
        category: "Тренди",
        author: "Сергій",
        readTime: "10 хв",
    },
    {
        id: 5,
        title: "Інклюзивний туризм в Україні: можливості для всіх",
        content: "Дізнайтеся, як організувати подорожі з урахуванням потреб людей з обмеженими можливостями.",
        imageUrl: "https://tourlib.net/statti_ukr/images/trohymec2.jpg",
        category: "Популярне",
        author: "Марія",
        readTime: "8 хв",
    },
    {
        id: 6,
        title: "Як організувати благодійну акцію для допомоги Україні",
        content: "Кроки для проведення успішного благодійного заходу.",
        imageUrl: "https://romny-vk.gov.ua/wp-content/uploads/2023/08/zobrazhennya_viber_2023-08-20_11-55-15-415.jpg",
        category: "Рекомендації",
        author: "Олексій",
        readTime: "4 хв",
    },
    {
        id: 7,
        title: "Можливості для працевлаштування людей з інвалідністю",
        content: "Дізнайтеся про програми та ініціативи, які сприяють працевлаштуванню.",
        // imageUrl: "https://naiu.org.ua/wp-content/uploads/2016/12/1441789011.jpg",
        category: "Топ",
        author: "Іван",
        readTime: "6 хв",
    },
    {
        id: 8,
        title: "Поради для людей з обмеженими можливостями: як зберегти здоров'я",
        content: "Рекомендації для підтримки фізичного та психологічного здоров'я.",
        category: "Тренди",
        author: "Оксана",
        readTime: "9 хв",
    },
    {
        id: 9,
        title: "Мережі підтримки для сімей людей з інвалідністю",
        content: "Корисні ресурси та контакти для родин, які доглядають за людьми з обмеженими можливостями.",
        // imageUrl: "https://images.unsplash.com/photo-1597764698132-dc8f8e298c2e",
        category: "Популярне",
        author: "Катерина",
        readTime: "7 хв",
    },
    {
        id: 10,
        title: "Історії волонтерів: допомога Україні через благодійність",
        content: "Натхненні історії людей, які змінюють світ на краще.",
        // imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0646",
        category: "Рекомендації",
        author: "Андрій",
        readTime: "5 хв",
    },
];
