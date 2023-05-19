import React, {useEffect, useState} from 'react';
import styles from './JobSearch.module.scss'
import {Button, CloseButton, Input, NumberInput, Pagination, Paper, Select, Text} from "@mantine/core";
import {IconChevronDown, IconSearch} from '@tabler/icons-react';
import ItemVacancies from "./itemsVacancies/ItemVacancies";
import {authUser} from "../login/authUser-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getCategories, getVacancies} from "../vacancy/vacancies-reducer";
import {useForm} from "@mantine/form";
import noSearch from '../../assets/images/ClipNoSearch.svg'
import Loading from "../../components/loading/Loading";


const JobSearch = React.memo(() => {
    const [numberPage, setNumberPage] = useState(1);
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies.objects)
    const categories = useAppSelector(state => state.vacancies.categories)
    const titleCategories = categories.map(v => v.title)
    const startIndex = (numberPage - 1) * 4;
    const endIndex = startIndex + 4;
    const allPages = Math.ceil(vacancies.length / 4)
    const isLoading = useAppSelector(state=>state.vacancies.isLoading)
    const setPage = (currentPage: number) => {
        setNumberPage(currentPage)
    }

    const form = useForm({
        initialValues: {categories: '', payment_from: 0, payment_to: 0},
    });
    const form1 = useForm({
        initialValues: {keyword: ''},
    });

    const resetForm = () => {
        form.setValues({payment_to: 0, payment_from: 0, categories: ''})
    }

    useEffect(() => {
        dispatch(authUser());
        dispatch(getVacancies({}))
        dispatch(getCategories())
    }, [dispatch])

    return (
        <div className={styles.containerJobSearch}>
            {isLoading && <Loading/>}
            {vacancies.length ? (
                    <div className={styles.jobSearchItems}>
                        <Paper shadow="xs" p="md" className={styles.itemFilter}>
                            <div className={styles.headerFilter}>
                                <Text className={styles.titleItemFilter}>Фильтры</Text>
                                <div className={styles.btnBlock}>
                                    <CloseButton aria-label="Close modal" className={styles.btnItemFilter}
                                                 onClick={resetForm}>
                                        Сбросить все
                                    </CloseButton>
                                    <CloseButton aria-label="Close modal" onClick={resetForm}/>
                                </div>
                            </div>
                            <form onSubmit={form.onSubmit((values) => {
                                const catologiesValue = categories.find(v => v.title === values.categories)?.key
                                dispatch(getVacancies({
                                    catalogues: catologiesValue ? catologiesValue : 0,
                                    payment_from: values.payment_from,
                                    payment_to: values.payment_to,
                                }));
                                form1.setValues({keyword: ''})
                            })}>
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
                                    data={titleCategories}
                                    {...form.getInputProps('categories')}
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
                                    {...form.getInputProps('payment_from')}
                                />
                                <NumberInput
                                    // label="Payment_to"
                                    style={{marginBottom: '1.5rem'}}
                                    styles={{
                                        label: {fontWeight: 'bold'},
                                        input: {height: '40px'}
                                    }}
                                    placeholder="до"
                                    max={100000}
                                    step={100}
                                    min={0}
                                    {...form.getInputProps('payment_to')}
                                />
                                <Button type="submit" className={styles.btnSendDataFilter}>
                                    Применить
                                </Button>
                            </form>
                        </Paper>
                        <div className={styles.contentJobSearch}>
                            <form onSubmit={form1.onSubmit((values) => {
                                dispatch(getVacancies({
                                    keyword: values.keyword
                                }));
                                resetForm();
                            })}>
                                <Paper shadow="xs" className={styles.itemSearch}>
                                    <Input
                                        variant="unstyled"
                                        icon={<IconSearch/>}
                                        placeholder="Введите название вакансии"
                                        sx={{width: '680px'}}
                                        {...form1.getInputProps('keyword')}
                                    />
                                    <Button type="submit" className={styles.btnSearch}>
                                        Поиск
                                    </Button>
                                </Paper>
                            </form>
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
                    </div>)
                : (<div className={styles.noSearch}>
                    <img src={noSearch} alt="FFF"/>
                    <div>Упс, здесь еще ничего нет!</div>
                    <Button onClick={() => window.location.reload()} className={styles.searchBack}>
                        Поиск Вакансий
                    </Button>
                </div>)
            }
        </div>
    );
})

export default JobSearch;

