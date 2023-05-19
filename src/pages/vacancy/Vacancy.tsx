import React, {useState} from 'react';
import {useAppSelector} from "../../hooks/hooks";
import styles from './Vacancy.module.scss';
import {Paper, Text} from "@mantine/core";
import starBlue from "../../assets/images/icons/StarBlue.svg";
import star from "../../assets/images/icons/Star.svg";
import iconLocation from "../../assets/images/icons/map-pin-grey.svg";
import {useParams} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';


type VacancyPageParams={
    id: string;
    [key: string]: string | undefined;
}

const Vacancy = () => {
    const [value, setValue] = useState(false);
    const vacancies = useAppSelector(state => state.vacancies.vacancies.objects)


    const {id} = useParams<VacancyPageParams>()
    if (!id) return <div>Описание отсутствует</div>;
    console.log(Number(id.slice(1)))

    const vac = vacancies.find(v=>v.id === Number(id.slice(1)))
    if(!vac){
        return <div>Описание отсутствует</div>
    }

    console.log('VAC', vac)

    const setColorStar =()=>{
        setValue(!value)
        // vacancies.is_selected = !value
        // setSelected(!value)
    }
    return (
        <div className={styles.containerVacancy}>
            <Paper shadow="xs" p="md" className={styles.itemVacancies}>
                <div  className={styles.headerVacancies}>
                        <Text className={styles.titleVacancies} >{vac.profession}</Text>
                    <div onClick={setColorStar}>
                        {/*<img src={value?starBlue:star} alt="Star"/>*/}
                        <img src={vac.favorite?starBlue:star} alt="Star"/>
                    </div>
                </div>
                <div className={styles.descriptionVacancies}>
                    <Text className={styles.salaryVacancies}>з/п от {vac.payment_from} rub</Text>
                    <div style={{ position:'relative',bottom:'15px', fontSize:'30px', color:'#7B7C88'}}><b>.</b></div>
                    <Text className={styles.timeWorkVacancies}>{vac.type_of_work.title}</Text>
                </div>
                <div className={styles.locationVacancies}>
                    <img src={iconLocation} alt="Location"/>
                    <Text className={styles.placeLocation}>{vac.town.title}</Text>
                </div>
            </Paper>
            <Paper shadow="xs" p="md" className={styles.descriptions}>
                {/*<div  className={styles.title}>*/}
                    {ReactHtmlParser(vac.vacancyRichText)}
                {/*</div>*/}


            </Paper>
        </div>
    );
};

export default Vacancy;