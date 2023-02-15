import React from 'react'
import Feed from './feed/Feed'
import Head from './helper/Head';

const Home = () => {
    return (
        <section className="container mainContainer">
            <Head title="Fotos" description="Home do site Dogs, com feed de fotos."/>
            <Feed/>
        </section>
    );
}

export default Home
