import React, { useEffect, useState, useRef } from 'react';
import './Page.scss';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {unsetLoader, setLoader} from "../../../redux/client";
import Spinner from "react-bootstrap/Spinner";
import Pagination from './Pagination'

function Page() {
    const maxPages = useRef(1);

    const [cards, setCards ] = useState([]);
    const [page, setPage ] = useState(1);
    const dispatch = useDispatch();
    const {loader}  = useSelector(state => state.client);


    useEffect(() => {
        dispatch(setLoader())
        axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(re => {
            maxPages.current = re.data.info.pages
            setCards(re.data.results);
            dispatch(unsetLoader());
        });

    }, [page,dispatch]);

    const onCardClick = (index,card) => {
        const newCards = [...cards];
        newCards[index].isNameVisible = !newCards[index].isNameVisible;
        setCards(newCards);
    };

    return (
        loader ?
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Spinner/>
            </div> :
        <div className="App w-100 h-100">
            <Pagination currentPage={page} onPageChange={(number)=>setPage(number)} totalPages={maxPages.current}/>
            <section className='cards-container'>
                {
                    cards.map(( card, index) => {
                        return (
                            <div
                                key={card.id}
                                className='card'
                                onClick={() => onCardClick(index,card)}
                            >
                                <img src={card.image} alt="char-img" loading="lazy"/>
                                <h3>
                                    {card.name}
                                </h3>
                                <p>{card.location.name}</p>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default Page;
