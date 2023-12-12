import React, { useEffect, useState, useCallback } from 'react';
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
import { useAppSelector, useAppDispatch } from "../../reducers";
import  { getPokemons } from '../../API/getPokemons';
import { getPokemonsByType } from '../../API/getPokemonsByType';
import PokemonTypesSelect  from '../../components/PokemonTypesSelect/PokemonTypesSelect';
import {
    updatePokemons,
    updatePokemonsByType,
    selectAllPokemons,
    selectPokemonType,
    selectPokemonsByType,
} from '../../reducers/PokemonsReducer';
import { DEFAULT_ROW_PER_PAGE, DEFAULT_PAGE_NUMBER } from '../../constants/Pokemons';

import styles from './Pokemons.module.scss';

const Pokemons:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(() => {
        const pageFromLocalStorage = localStorage.getItem('page');

        return (pageFromLocalStorage && +pageFromLocalStorage) || DEFAULT_PAGE_NUMBER;
    });
    const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROW_PER_PAGE);

    const allPokemons = useAppSelector(selectAllPokemons);
    const typeUrl = useAppSelector(selectPokemonType).typeUrl;
    const typeName = useAppSelector(selectPokemonType).typeName;
    const pokemonsByType = useAppSelector(selectPokemonsByType);
    const pokemonsPerPage = allPokemons.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage);

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
    
    const renderPokimonsByType = useCallback(() => {
        return pokemonsByType.map(item => {
            return (
                <div className={styles.pokemonsByType} key={item.pokemon.url}>
                    <Link to={`/${item.pokemon.name}`}>{item.pokemon.name}</Link>
                </div>
            );
        });
    }, [pokemonsByType]);
     
    return (
        <div>
            <Paper sx={{ width: '50%', marginLeft: '25%' }}>
                <Autocomplete
                    noOptionsText="There is no such Pokemon"
                    onChange={(event: React.SyntheticEvent<Element, Event>, pokemonName: string | null) => {
                        navigate(`/${pokemonName}`);
                      }}
                    options={allPokemons && allPokemons.map(({ name }:{ name: string }) => name)}
                    renderInput={(params) => <TextField {...params} label="Enter the pokemon's name..." />}
                    className={styles.search}
                />
                <PokemonTypesSelect />
                {typeUrl 
                    ? <div className={styles.pokemonByTypeTitleWrapper}>
                        <div className={styles.pokemonsByTypeTitle}>Result for: {typeName}</div>
                        {renderPokimonsByType()}
                    </div>
                    : <>
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table>
                                <TableBody>
                                    {allPokemons && pokemonsPerPage.map(({ url, name }:{ url: string, name: string }) => {
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
                            count={allPokemons.length}
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