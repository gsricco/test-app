import React, {useEffect, useState} from 'react';
import styles from "./ItemVacancies.module.scss";
import {Paper, Text} from "@mantine/core";
import starBlue from "../../../assets/images/icons/StarBlue.svg";
import star from "../../../assets/images/icons/Star.svg";
import iconLocation from "../../../assets/images/icons/map-pin-grey.svg";
import {ItemVacanciesType} from "../../../api/vacanciesApi";
import {Link, LinkProps} from "react-router-dom";
import {Path} from "../../../enums/path";
import {useAppDispatch} from "../../../hooks/hooks";
import {getCategories, getFavorite, setFavoriteStatus, setNoFavoriteStatus} from "../../vacancy/vacancies-reducer";


type PropsItemVacanciesType ={
    key:number
    vac: ItemVacanciesType
    index:number
}



const ItemVacancies = ({index,vac}:PropsItemVacanciesType) => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState(vac.favorite);

    const setColorStar =()=>{
        value?dispatch(setNoFavoriteStatus({id:vac.id})):dispatch(setFavoriteStatus({id:vac.id}))
        setValue(!value)
    }


    useEffect(()=>{
        // dispatch(getFavorite())
    },[])

    return (
        <Paper key={index} shadow="xs" p="md" className={styles.itemVacancies}>
            <div  className={styles.headerVacancies}>
                <Link to={`${Path.VACANCY}/:${vac.id}`}>
                    <Text className={styles.titleVacancies} >{vac.profession}</Text>
                </Link>
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
    );
};

export default ItemVacancies;

