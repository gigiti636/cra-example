import React, { useEffect, useState } from 'react';
import './Page.scss';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import {unsetLoader, setLoader} from "../../../redux/client";
import Spinner from "react-bootstrap/Spinner";

function Page() {
    const [cards, setCards ] = useState([]);
    const dispatch = useDispatch();
    const {loader}  = useSelector(state => state.client);


    useEffect(() => {
        const data = [];
        dispatch(setLoader())
        for( var i=1 ; i <= 100; i=i+1 ) {
            data.push(axios.get(`https://rickandmortyapi.com/api/character/${i}`));
        }
        Promise.all(data)
            .then(re => {
                let allCards = [];
                const apiData = re.map(re => {
                    return {
                        id : re.data.id,
                        name : re.data.name,
                        image: re.data.image,
                        species : re.data.species,
                        isNameVisible: false
                    }
                });
                allCards = [...apiData];
                setCards(allCards);
                dispatch(unsetLoader());
            });
    }, []);

    const onCardClick = (index,card) => {
        const newCards = [...cards];
        newCards[index].isNameVisible = !newCards[index].isNameVisible;
        setCards(newCards);
    };

    return (
        <div className="App w-100 h-100">
            {
                loader &&
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <Spinner/>
                </div>
            }
            <section className='cards-container'>
                {
                    cards.map(( card, index) => {
                        return (
                            <div
                                key={card.id}
                                className='card'
                                onClick={() => onCardClick(index,card)}
                            >
                                <img src={card.image}></img>
                                <h3>
                                    {
                                        card.isNameVisible ? card.name : '???'
                                    }
                                </h3>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    );
}

export default Page;
