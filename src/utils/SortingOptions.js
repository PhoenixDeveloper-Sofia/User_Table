// Документ содержит заголовок для вывода и ключ JSON (из API). Это позволит модифицировать сортировку (добавлять и удалять поля) без необходимости переписывать логику или верстку.

const SORTING_OPTIONS = [
    {
        title: 'Дата регистрации',
        option: 'registration_date'
    },

    {
        title: 'Рейтинг',
        option: 'rating'
    },
]
export default SORTING_OPTIONS;