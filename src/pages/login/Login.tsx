import React, {useEffect} from 'react';
// import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
// import {useFormik} from "formik";
// import styles from './Login.module.scss'
// import {Navigate} from "react-router-dom";
//
// import {loginTC, setUserID} from "./login-reducer";
// import {selectIsLoggedIn, selectToken, selectUserID} from "./selectors";
// import {Path} from "../../enums/path";
import {NumberInput, TextInput, Button, Box} from '@mantine/core';
import {useForm} from "@mantine/form";
import {useAppDispatch} from "../../hooks/hooks";
import {authUser, getVacancies} from "./authUser-reducer";
import axios from 'axios';
const Login = () => {
    /*const dispatch = useAppDispatch()
    let isLoggedIn = useAppSelector(selectIsLoggedIn);
    let token = useAppSelector(selectToken)
    let userID = useAppSelector(selectUserID)

    const formik = useFormik({
        validate: (values) => {
            if (!values.login)
                return {
                    login: 'Введите ЛОГИН'
                }
            if (!values.password)
                return {
                    password: 'введите ПАРОЛЬ'
                }
        },
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: (values: FormValuesType) => {
            dispatch(loginTC({password: values.password, username: values.login}))
            // dispatch(authUserTC({token}))
            // if(userPhoto) dispatch(setUserAvatar({avatar:userPhoto}))
        }
    });
    useEffect(() => {
        const userID = Number(localStorage.getItem('userID'));
        (userID !== 0)
            ? dispatch(setUserID({userID}))
            : dispatch(setUserID({userID: 0}))

        if (userID) dispatch(getUserTC({id: userID}))
    }, [])

    console.log('LOGIN', token, userID)


    if (isLoggedIn) {
        return <Navigate to={Path.PROFILE}/>
    }
*/


    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {name: '', email: '', age: 0},

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value: string) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            age: (value: number) => (value < 18 ? 'You must be at least 18 to register' : null),
        },
    });



   /* const clientId = '2356';
    const clientSecret = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
    const redirectUri = 'http://www.example.ru';
    const code = 'c907a';

    axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/access_token/?code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(response => {
            console.log(response.data); // здесь можно обрабатывать полученные данные
        })
        .catch(error => {
            console.log(error);
        });*/

    useEffect(() => {
        dispatch(authUser());
        dispatch(getVacancies())
    }, [])

    return (
        <Box maw={320} mx="auto">
            <form onSubmit={form.onSubmit(console.log)}>
                <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                <NumberInput
                    mt="sm"
                    label="Age"
                    placeholder="Age"
                    min={0}
                    max={99}
                    {...form.getInputProps('age')}
                />
                <Button type="submit" mt="sm">
                    Submit
                </Button>
            </form>
        </Box>
        /* <div className={styles.pageContainer}>
             <Paper className={styles.paper} elevation={3}>
                 <Grid container justifyContent={'center'}>
                     <Grid item justifyContent={'center'}>

                         <form onSubmit={formik.handleSubmit}>
                             <FormControl>
                                 <FormLabel>
                                     <p>Введите ЛОГИН и ПАРОЛЬ</p>
                                 </FormLabel>
                                 <FormGroup>
                                     <TextField
                                         className={styles.textField}
                                         label="Логин"
                                         margin="normal"
                                         color="success"
                                         focused
                                         {...formik.getFieldProps('login')}
                                     />
                                     {formik.errors.login ? <div style={{height: '20px'}}>{formik.errors.login}</div> :
                                         <div style={{height: '20px'}}></div>}
                                     <TextField
                                         className={styles.textField}
                                         type="password"
                                         label="Пароль"
                                         color="success"
                                         margin="normal"
                                         focused
                                         {...formik.getFieldProps('password')}
                                     />
                                     {formik.errors.password ?
                                         <div style={{height: '20px'}}>{formik.errors.password}</div> :
                                         <div style={{height: '20px'}}></div>}
                                     <Button className={styles.button} type={'submit'} variant={'contained'}
                                             color={'primary'}>
                                         Login
                                     </Button>
                                 </FormGroup>
                             </FormControl>
                         </form>

                     </Grid>
                 </Grid>
             </Paper>
             <div className={styles.backgroundPictures}>
                 <img className={styles.pictureLeft} src={pictureLeft} alt="matklass"/>
                 <img className={styles.pictureRight} src={pictureRight} alt="matklass"/>
             </div>
         </div>*/
    )
}

export default Login;

