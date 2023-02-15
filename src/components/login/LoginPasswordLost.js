import React from 'react'
import Input from '../forms/Input'
import Button from '../forms/Button'
import useForm from'../../hooks/useForm'
import useFetch from'../../hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Error from '../helper/Error'
import Head from '../helper/Head'


const LoginPasswordLost = () => {

    const login = useForm()
    const {data, loading, error, request} = useFetch()

    async function handleSubmit(event) {

        event.preventDefault()
        if(login.validate()){

            const{url, options} = PASSWORD_LOST({login: login.value, url: window.location.href.replace('perdeu', 'resetar')})

            const {json} = await request(url, options)
            console.log(json)

        }
       

    }

    return (
        <section className="animeLeft">

            <Head title="Perdeu a senha"/>

            <h1 className="title">Perdeu a senha?</h1>

            {data ? (
                <p style={{color:'#4c1'}}>{data}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                <Input label="E-mail / Usuário" type="text" name="login" {...login}/>
 
                {loading ? (
                         <Button disabled>Enviando...</Button>
                     ) : (
                         <Button>Enviar E-mail</Button>
                     )
                }
                </form>
            ) }
           

            <Error error={error}/>
            
        </section>
    )
}

export default LoginPasswordLost
