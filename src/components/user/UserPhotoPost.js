import React from 'react'
import styles from './UserPhotoPost.module.css'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import Input from '../forms/Input'
import Button from '../forms/Button'
import Error from '../helper/Error'
import { PHOTO_POST } from '../../api'
import { useNavigate } from 'react-router-dom'
import Head from '../helper/Head'



const UserPhotoPost = () => {

    const nome = useForm()
    const peso = useForm()
    const idade = useForm()
    const [img, setImg] = React.useState({})
    const {data, error, loading, request} = useFetch()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        
            event.preventDefault()
            const formData = new FormData()
            formData.append('img', img.raw)
            formData.append('nome', nome.raw)
            formData.append('peso', peso.raw)
            formData.append('idade', idade.raw)

            const token = window.localStorage.getItem('token')
            const {url, options} = PHOTO_POST(formData, token)
            request(url, options)
        
    }
    
    const handleImgChange = ({target}) => {
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        })
    
    }

    React.useEffect(() =>{
        if(data) navigate('/conta')
    },[data, navigate])

    return (
        <section className={`${styles.photoPost} animeLeft` }>

            <Head title="Poste sua foto."/>

            <form onSubmit={handleSubmit}>
                <Input label="Nome" type="text" name="nome" {...nome}/>
                <Input label="Peso" type="number" name="peso" {...peso}/>
                <Input label="Idade" type="number" name="idade" {...idade}/>
                <Input
                  className={styles.file}
                  type="file" 
                  name="img" 
                  onChange={handleImgChange}
                  />
                {
                    loading ? (
                        <Button disabled>Enviando...</Button>
                    ): (
                        <Button>Enviar</Button>
                    )
                }
                <Error error={error} />
               
            </form>
            <div>
                {img.preview && (
                    <div className={styles.preview}
                    style={{backgroundImage: `url('${img.preview}')`}}
                    ></div>
                )}

            </div>
        </section>
    )
}

export default UserPhotoPost
