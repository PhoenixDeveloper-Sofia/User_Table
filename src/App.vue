<script setup>
import { onMounted, ref, watch } from 'vue';
import getData from '@/store';
import { useFormatDate } from '@/hooks/useFormatDate';
import SearchBar from '@/сomponents/SearchBar/SearchBar.vue';
import SortingUser from '@/сomponents/SortingUser/SortingUser.vue';
import HEADERS_TABLE from '@/utils/UserTableHeader';
import TableUI from '@/сomponents/UI/Table/TableUI.vue';
import UserTableBody from '@/сomponents/UserTable/UserTableBody.vue';
import useGetNumberPagination from '@/hooks/useGetNumberPagination';
import PaginationsBar from '@/сomponents/UI/Table/PaginationsBarUI.vue';
import ModalDeletUser from './сomponents/ModalDeletUser/ModalDeletUser.vue';


let defaultList = ref([])
let deletUserId
//Пагинация
const page = ref(0)
const pageArray = ref()
let totalPages
const userList = ref()
let searchQuery = ref('')
// Сортировка
const sortUser = ref({
    type: '',
    increase: false
})

const isClearShow = ref (false)

//Удаления пользователя из таблицы (модальное окно)
const isOpenModal = ref(false)

const updateOpenModal = ({ isDelet, id }) => {
    if (id) {
        deletUserId = id

    }
    else if (isDelet && deletUserId) {
        defaultList.value = defaultList.value.filter((user) => user.id !== deletUserId)
    }
    isOpenModal.value = !isOpenModal.value
    searchUser()
}

//  Сортировка
const toggleSortOption = (newType) => {
    if (sortUser.value.type !== newType) {
        sortUser.value = {
            type: newType,
            increase: false
        }

    }
    else {
        sortUser.value = {
            ...sortUser.value,
            increase: !sortUser.value.increase
        }
    }
    searchUser()
}


const sortUserList = () => {
    return  defaultList.value.sort((a, b) => {
        if (sortUser.value.type === 'registration_date') {
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);
            return sortUser.value.increase ? dateA - dateB : dateB - dateA;
        }
        else if (sortUser.value.type === '') {
            return a.id - b.id;
        }
        else if (sortUser.value.type === 'rating') {
            return sortUser.value.increase ? a.rating - b.rating : b.rating - a.rating;
        }
    })

}

//  Поиск 
const searchUser = (searchQueryProp) => {
    if (searchQueryProp != undefined){
        searchQuery.value = searchQueryProp
    }
    let searchRezult = allFilter()
    getNewUserList(searchRezult)
}

const allFilter = () => {
    let sortList = sortUserList();
   return sortList.filter(user => {
        return (user.username?.toLowerCase().includes(searchQuery.value.trim().toLowerCase()) || user.email?.toLowerCase().includes(searchQuery.value.trim().toLowerCase()));
    });
}

// Очистка
const clearShow = () => {
    isClearShow.value = !!(searchQuery.value || sortUser .value.type);
}

watch([searchQuery, () => sortUser.value.type], () => {
    clearShow();
});

const clearFilter = () => {
    searchQuery.value = ''
    sortUser.value = {
            type: '',
            increase: false
        }
        searchUser()
}

// Получаем данные и форматируем дату в читаемый вид
onMounted(async () => {
    let data = await getData(process.env.VUE_APP_URL_USER);
    defaultList.value = data.map(user => ({
        ...user,
        registration_date_view: useFormatDate(user.registration_date)
    }));
    getNewUserList(defaultList.value)
});

// Получаем номера страниц для меню пагинации и выводим первые записи

const getNewUserList = (list) => {
    totalPages = Math.ceil(list.length / 5)
    pageArray.value = useGetNumberPagination(totalPages)
    userList.value = list.slice(slice.start, slice.end)
}

let slice = {
    start: 0,
    end: 5
}


const updatePage = (newPage) => {
    page.value = newPage - 1
    getPaginationList()
}

const getPaginationList = () => {
    slice.start = 5 * page.value
    slice.end = 5 * page.value + 5
    let searchRezult = allFilter()
    userList.value = searchRezult.slice(slice.start, slice.end)
}

</script>

<template>
    <div class="wrapper">
        <h1 class="pageTiitle">Список пользователей</h1>
        <SearchBar :clearFilter="clearFilter" :searchUser="searchUser"  :isClearShow="isClearShow"/>
        <SortingUser :sortUser="sortUser" :toggleSortOption="toggleSortOption" />
        <TableUI :headerItem="HEADERS_TABLE">
            <UserTableBody :userList="userList" :updateOpenModal="updateOpenModal" />
            <template #footerBar>
                <PaginationsBar :updatePage="updatePage" :paginationsOptins="pageArray" :page="page" />
            </template>
        </TableUI>
        <ModalDeletUser :isOpenModal="isOpenModal" :updateOpenModal="updateOpenModal" />
    </div>
</template>

<style scoped>
.wrapper {
    padding: 12px 12px 12px 27px;
    width: 100vw;
    max-width: 1920px;
}

.pageTiitle {
    font-size: 24px;
    line-height: 28px;
    padding-bottom: 32px;
    font-weight: 700;
}
</style>