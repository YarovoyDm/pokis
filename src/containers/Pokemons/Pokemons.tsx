import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from "../../reducers";
import  { getPokemons } from '../../API/getPokemons';
import { getPokemonsByType } from '../../API/getPokemonsByType';
import PokemonTypesSelect  from '../../components/PokemonTypesSelect/PokemonTypesSelect';
import {
    updatePokemons,
    updatePokemonsByType,
} from '../../reducers/PokemonsReducer';
import { DEFAULT_ROW_PER_PAGE, DEFAULT_PAGE_NUMBER } from '../../constants/Pokemons';

import styles from './Pokemons.module.scss';

const Pokemons:React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const store = useSelector((state: RootState) => state);

    const [page, setPage] = useState<number>(() => {
        const pageFromLocalStorage = localStorage.getItem('page');

        return (pageFromLocalStorage && +pageFromLocalStorage) || DEFAULT_PAGE_NUMBER;
    });
    const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROW_PER_PAGE);

    const pokemonsPerPage = store.pokemons.allpokemons.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage);
    const typeUrl = store.pokemons.pokemonType.typeUrl;
    const typeName = store.pokemons.pokemonType.typeName;

    useEffect(() => {
        typeUrl && getPokemonsByType(typeUrl).then(res => dispatch(updatePokemonsByType(res.data.pokemon)));
    }, [typeUrl]);

    useEffect(() => {
        getPokemons(100)
            .then(res => dispatch(updatePokemons(res.data.results)));
    }, []);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        localStorage.setItem('page', newPage.toString());
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, DEFAULT_ROW_PER_PAGE));
        setPage(DEFAULT_PAGE_NUMBER);
    };
    
    const renderPokimonsByType = () => {
        return store.pokemons.pokemonsByType.map(item => {
            return (
                <div className={styles.pokemonsByType} key={item.pokemon.url}>
                    <Link to={`/${item.pokemon.name}`}>{item.pokemon.name}</Link>
                </div>
            );
        });
    };
     
    return (
        <div>
            <Paper sx={{ width: '50%', marginLeft: '25%' }}>
                <Autocomplete
                    noOptionsText="There is no such Pokemon"
                    onChange={(event: React.SyntheticEvent<Element, Event>, pokemonName: string | null) => {
                        navigate(`/${pokemonName}`);
                      }}
                    options={store.pokemons.allpokemons && store.pokemons.allpokemons.map(({ name }:{ name: string }) => name)}
                    renderInput={(params) => <TextField {...params} label="Enter the pokemon's name..." />}
                    className={styles.search}
                />
                <PokemonTypesSelect />
                {typeUrl 
                    ? <div className={styles.pokemonByTypeTitleWrapper}>
                        <div className={styles.pokemonsByTypeTitle}>Result for: {typeName}</div>
                        {renderPokimonsByType()};
                    </div>
                    : <>
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table>
                                <TableBody>
                                    {store.pokemons.allpokemons && pokemonsPerPage.map(({ url, name }:{ url: string, name: string }) => {
                                        return <Link to={`/${name}`} key={url}><TableRow >
                                            <TableCell>{name}</TableCell>
                                        </TableRow></Link>;
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[10, 15, 20]}
                            count={store.pokemons.allpokemons.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>}
            </Paper>
        </div>
    );
};

export default Pokemons;