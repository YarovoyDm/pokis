import React, { useMemo, useState } from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AllPokemons } from 'types/Pokemons';
import { DEFAULT_ROW_PER_PAGE, DEFAULT_PAGE_NUMBER } from 'constants/Pokemons';

type Props = {
    pokemons: Array<AllPokemons>,
};

const PokemonsTable:React.FC<Props> = ({ pokemons }) => {
    const [page, setPage] = useState<number>(() => {
        const pageFromLocalStorage = localStorage.getItem('page');

        return (pageFromLocalStorage && +pageFromLocalStorage) || DEFAULT_PAGE_NUMBER;
    });
    const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROW_PER_PAGE);
    const pokemonsPerPage = useMemo(() => {
        return pokemons.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [pokemons, page, rowsPerPage]);

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

    return (
        <>
            <TableContainer style={{ marginTop: '20px' }}>
                <Table>
                    <TableBody>
                        {pokemons && pokemonsPerPage.map(({ url, name }:{ url: string, name: string }) => {
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
                count={pokemons.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default PokemonsTable;