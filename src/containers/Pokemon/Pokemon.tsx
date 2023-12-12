import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reducers";
import {
    updatePokemonInfo,
    updatePokemonType,
} from '../../reducers/PokemonsReducer';
import { Moves, PokemonTypes } from '../../types/Pokemons';
import { getPokemonInfo } from '../../API/getPokemonInfo';

import styles from './Pokemon.module.scss';

const Pokemon:React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { pokemonName } = useParams();
    const store = useSelector((state: RootState) => state.pokemons.pokemonInfo);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        pokemonName && getPokemonInfo(pokemonName).then(res => {
            dispatch(updatePokemonInfo(res.data));
            setIsloading(false);
        });
    }, [pokemonName]);

    const { types, name, moves, sprites } = store;
    const pokemonAvatar = "url(" + `${sprites && sprites.front_default}` + ")";

    const typesRender = () => {
        return types && types.map((item: PokemonTypes) => {
            return <div key={item.id} className={styles.pokemonType} onClick={() => onTypeClick(item)}>{item.type.name}</div>;
        });
    };

    const movesRender = () => {
        return moves && moves.map((item: Moves) => {
            return <div className={styles.move} key={item.move.url}>{item.move.name}</div>;
        });
    };

    const onTypeClick = (data: PokemonTypes) => {
        const dataForSaving = {
            typeName: data.type.name,
            typeUrl: data.type.url,
        };

        dispatch(updatePokemonType(dataForSaving));
        navigate('/');
    };

    return (
        <>
            {isLoading
                ? <div className={styles.loading}>Loading...</div>
                : <div className={styles.pageWrapper}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>Go back</button>
                    <div className={styles.pokemonDescription}>
                        <div className={styles.pokemonInformation}>
                            <div className={styles.pokemonAvatar} style={{ backgroundImage: pokemonAvatar }} />
                            <div className={styles.pokemonName}>
                                {name}
                            </div>
                        </div>
                        <div className={styles.pokemonMoves}>
                            <div className={styles.title}>Moves</div>
                            <div className={styles.content}>{movesRender()}</div>
                        </div>
                        <div className={styles.pokemonTypes}>
                            <div className={styles.title}>Types</div>
                            <div className={styles.content}>{typesRender()}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Pokemon;