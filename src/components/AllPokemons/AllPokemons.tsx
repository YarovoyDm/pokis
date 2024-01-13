import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'components';
import { DEFAULT_ROW_PER_PAGE, DEFAULT_PAGE_NUMBER, LOCAL_STORAGE_PAGE_KEY } from 'constants/Pokemons';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Pokemon } from 'types/Pokemons';

import styles from './AllPokemons.module.scss';

type Props = {
    pokemons: Array<Pokemon>,
};

const PokemonsTable:React.FC<Props> = ({ pokemons }) => {
    const { getItemFromLocalStorage } = useLocalStorage(LOCAL_STORAGE_PAGE_KEY);
    const [page, setPage] = useState<number>(() => {
        const pageFromLocalStorage = getItemFromLocalStorage();

        return pageFromLocalStorage || DEFAULT_PAGE_NUMBER;
    });

    const pokemonsPerPage = useMemo((): Array<Pokemon> => {
        return pokemons.slice(page* DEFAULT_ROW_PER_PAGE, page * DEFAULT_ROW_PER_PAGE + DEFAULT_ROW_PER_PAGE);
    }, [pokemons, page]);

    const pagesQuantity = useMemo((): number => Math.ceil(pokemons.length / DEFAULT_ROW_PER_PAGE), [pokemons]);

    return (
        <>
            <div className={styles.pokemonsWrapper}>
                {pokemons && pokemonsPerPage.map(({ url, name }:{ url: string, name: string }): React.ReactElement => {
                    return <Link to={`/${name}`} key={url} className={styles.pokemon}>{name}</Link>;
                })}
            </div>
            <Pagination page={page} setPage={setPage} pagesQuantity={pagesQuantity}/>
        </>
    );
};

export default PokemonsTable;