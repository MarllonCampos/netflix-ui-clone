import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb'
import './components/FeaturedMovie'
import Header from './components/Header'
import FeaturedMovie from './components/FeaturedMovie'
import MovieRow from './components/MovieRow'

function App() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')

      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))

      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

      setFeatureData(chosenInfo);

    }

    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])


  return (
    <div className="page">
      <Header black={blackHeader} />
      {
        featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pelo Marllon Campos Criado com o auxilio da aula <a href="https://www.youtube.com/watch?v=tBweoUiMsDg" target="_blank" rel="noopener noreferrer">Ir para o youtube</a><br />
        Direitos de imagem para Netflix<br />
        Dados pegos de Themoviedb.org

      </footer>
      {
        movieList <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading" />
        </div>
      }
    </div >
  );
}

export default App;
