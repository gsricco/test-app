import React, {useEffect} from 'react';
import {Box, Button, NumberInput, TextInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {useAppDispatch} from "../../hooks/hooks";
import {authUser} from "./authUser-reducer";
import {getVacancies} from "../vacancy/vacancies-reducer";

const Login = () => {
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



    useEffect(() => {
        dispatch(authUser());
        dispatch(getVacancies({catalogues:0,payment_to:0, payment_from:0,keyword:''}))
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

    )
}

export default Login;

