import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { AllTypes } from '../../types/Pokemons';
import { getTypes } from '../../API/getTypes';
import { useAppSelector, useAppDispatch } from "../../reducers";
import { updatePokemonType, selectPokemonType } from '../../reducers/PokemonsReducer';

const PokemonTypesSelect:React.FC = () => {
    const dispatch = useAppDispatch();
    const [typesSelectIsOpen, setTypesSelectIsOpen] = useState<boolean>(false);
    const [typesOptions, setTypesOptions] = useState<AllTypes[]>([]);
    const souldWeFetchTypes = typesSelectIsOpen && typesOptions.length === 0;
    const typeName = useAppSelector(selectPokemonType).typeName;

    useEffect(() => {
        let active = true;

        if (!souldWeFetchTypes) {
            return undefined;
        };

        getTypes().then(res => {
            if(active) {
                setTypesOptions(res.data.results);
            };
        });
            
        return () => {
            active = false;
        };

    }, [souldWeFetchTypes]);

    const typeHandleChange = (event: React.SyntheticEvent<Element, Event>, pokemonType: string | null) => {
        const getUrlForType = pokemonType && typesOptions.filter(type => type.name === pokemonType)[0].url;
        const prepareTypeName = pokemonType || null;
        const prepareTypeUrl = pokemonType ? getUrlForType : null;
        const dataForSaving = {
            typeName: prepareTypeName,
            typeUrl: prepareTypeUrl,
        };
        
        dispatch(updatePokemonType(dataForSaving));
    };

    return (
        <Autocomplete
            sx={{ width: 300 }}
            open={typesSelectIsOpen}
            onOpen={() => {
                setTypesSelectIsOpen(true);
            }}
            onClose={() => {
                setTypesSelectIsOpen(false);
            }}
            defaultValue={typeName || null}
            options={typesOptions && typesOptions.map(({ name }: { name: string }) => name)}
            loading={souldWeFetchTypes}
            onChange={typeHandleChange}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Search for pokemon by type"
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <React.Fragment>
                        {souldWeFetchTypes ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                    ),
                }}
                />
            )}
        />
    );
};

export default PokemonTypesSelect;