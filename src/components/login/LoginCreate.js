import React from 'react'
import { USER_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import UserContext from '../../UserContext';
import Button from '../forms/Button';
import Input from '../forms/Input';
import Error from '../helper/Error';
import Head from '../helper/Head';


const LoginCreate = () => {

    const username =useForm();
    const email =useForm('email');
    const password =useForm('');

    const {userLogin} = React.useContext(UserContext);
    const { loading, error, request } = useFetch();

    async function handleSubmit (event){
        event.preventDefault();

        const {url, options} = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value,

        });
        const { response } = await request(url, options);
        if (response.ok) userLogin(username.value, password.value);
    }

    return (
        <section className="animeLeft">

            <Head title="Crie sua conta"/>

            <h1 className="title">Cadasre-se</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="username" {...username}/>
                <Input label="Email" type="email" name="email" {...email}/>
                <Input label="Senha" type="password" name="username" {...password}/>
                {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
                <Error error={error}/>
            </form>

        </section>
    )
}

export default LoginCreate
