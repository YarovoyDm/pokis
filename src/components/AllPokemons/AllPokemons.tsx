import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { DEFAULT_ROW_PER_PAGE, DEFAULT_PAGE_NUMBER } from 'constants/Pokemons';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { AllPokemons } from 'types/Pokemons';

import styles from './AllPokemons.module.scss';

type Props = {
    pokemons: Array<AllPokemons>,
};

const PokemonsTable:React.FC<Props> = ({ pokemons }) => {
    const { getItemFromLocalStorage } = useLocalStorage('page');
    const [page, setPage] = useState<number>(() => {
        const pageFromLocalStorage = getItemFromLocalStorage();

        return pageFromLocalStorage || DEFAULT_PAGE_NUMBER;
    });

    const pokemonsPerPage = useMemo((): Array<AllPokemons> => {
        return pokemons.slice(page* DEFAULT_ROW_PER_PAGE, page * DEFAULT_ROW_PER_PAGE + DEFAULT_ROW_PER_PAGE);
    }, [pokemons, page]);

    const pagesQuantity = useMemo((): number => Math.ceil(pokemons.length / DEFAULT_ROW_PER_PAGE), [pokemons]);

    return (
        <>
            <div className={styles.pokemonsWrapper}>
                {pokemons && pokemonsPerPage.map(({ url, name }:{ url: string, name: string }) => {
                    return <Link to={`/${name}`} key={url} className={styles.pokemon}>{name}</Link>;
                })}
            </div>
            <Pagination page={page} setPage={setPage} pagesQuantity={pagesQuantity}/>
        </>
    );
};

export default PokemonsTable;