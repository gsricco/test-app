import React, {useEffect, useState} from 'react';
import styles from './JobSearch.module.scss'
import {Button, CloseButton, Input, NumberInput, Pagination, Paper, Select, Text} from "@mantine/core";
import {IconChevronDown, IconSearch} from '@tabler/icons-react';
import ItemVacancies from "./itemsVacancies/ItemVacancies";
import {authUser, getVacancies} from "../login/authUser-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


const JobSearch = () => {
    const [numberPage, setNumberPage] = useState(1);
    const dispatch = useAppDispatch()


    const [lastIndex, setLastIndex] = useState(0);
    const vacancies = useAppSelector(state => state.auth.vacancies.objects)
    console.log('VAC', vacancies)
    vacancies.map((v, ind) => {
        console.log(v.already_sent_on_vacancy)
    })
    const startIndex = (numberPage - 1) * 4;
    const endIndex = startIndex + 4;

    const handleClick = (currentPage: number) => {
        setLastIndex(currentPage * 4 - 4);
        console.log('setLastIndex', lastIndex)

    };


    const allPages = Math.ceil(vacancies.length / 4)
    console.log('PAGES:', allPages)
    console.log('VALUE', numberPage)

    const setPage = (currentPage: number) => {
        setNumberPage(currentPage)
        handleClick(currentPage)
        console.log('currentPage', currentPage)
    }
    console.log(vacancies, '2222222')

    useEffect(() => {
        dispatch(authUser());
        dispatch(getVacancies())
    }, [])


    return (
        <div className={styles.containerJobSearch}>
            <div className={styles.jobSearchItems}>
                <Paper shadow="xs" p="md" className={styles.itemFilter}>
                    <div className={styles.headerFilter}>
                        <Text className={styles.titleItemFilter}>Фильтры</Text>
                        <CloseButton aria-label="Close modal" className={styles.btnItemFilter}>
                            Сбросить все
                            <CloseButton aria-label="Close modal"/>
                        </CloseButton>
                    </div>
                    <Select
                        label="Отрасль"
                        placeholder="Выберете отрасль"
                        rightSection={<IconChevronDown size="1rem"/>}
                        rightSectionWidth={30}
                        style={{marginBottom: '1rem'}}
                        styles={{
                            rightSection: {pointerEvents: 'none'},
                            label: {fontWeight: 'bold'},
                            input: {height: '40px'}
                        }}
                        data={['Строительство', 'Экономика', 'IT', 'Реклама']}
                    />
                    <NumberInput
                        label="Оклад"
                        style={{marginBottom: '.5rem'}}
                        styles={{
                            label: {fontWeight: 'bold'},
                            input: {height: '40px'}
                        }}
                        placeholder="от"
                        max={100000}
                        step={100}
                        min={0}
                    />
                    <NumberInput
                        style={{marginBottom: '1.5rem'}}
                        styles={{
                            label: {fontWeight: 'bold'},
                            input: {height: '40px'}
                        }}
                        placeholder="до"
                        max={100000}
                        step={100}
                        min={0}
                    />
                    <Button className={styles.btnSendDataFilter}>
                        Применить
                    </Button>
                </Paper>
                <div className={styles.contentJobSearch}>
                    <Paper shadow="xs" className={styles.itemSearch}>
                        <Input
                            variant="unstyled"
                            icon={<IconSearch/>}
                            placeholder="Введите название вакансии"
                            sx={{width: '680px'}}
                        />
                        <Button className={styles.btnSearch}>
                            Поиск
                        </Button>
                    </Paper>
                    {
                        vacancies.slice(startIndex, endIndex).map((v, index) => {

                            return (
                                <ItemVacancies key={index} index={index} vac={v}/>
                            )
                        })
                    }
                    <div className={styles.pagination}>
                        <Pagination onChange={(e) => setPage(e)} total={allPages} siblings={1}
                                    defaultValue={numberPage}/>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default JobSearch;

