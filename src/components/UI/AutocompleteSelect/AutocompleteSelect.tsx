import React, { useState, useEffect, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { getTypes } from 'API';
import { useAppSelector, useAppDispatch } from 'reducers';
import { selectPokemonType, updatePokemonType } from 'reducers/PokemonsReducer';
import { AllPokemons } from 'types/Pokemons';

import styles from './AutocompleteSelect.module.scss';

type AutocompleteType = {
    noOptionsText?: string,
    placeholder?: string,
    options?: Array<AllPokemons>,
    width?: number,
    size?: "small" | "medium",
    fetchWhenOpen?: boolean,
}

const AutocompleteSelect:React.FC<AutocompleteType> = ({
    noOptionsText,
    placeholder,
    options,
    width,
    size,
    fetchWhenOpen,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);
    const [selectOptions, setSelectOptions] = useState<Array<AllPokemons>>([]);
    const typeName: string | null = useAppSelector(selectPokemonType).typeName;
    const shouldWeFetchTypes = useMemo((): boolean | undefined => 
        (selectIsOpen && fetchWhenOpen && selectOptions?.length === 0), [fetchWhenOpen, selectIsOpen, selectOptions]);

    useEffect(() => {
        options && setSelectOptions(options);
    }, [options]);

    useEffect(() => {
        let active = true;

        if (!shouldWeFetchTypes) {
            return undefined;
        };

        getTypes().then(res => {
            if(active) {
                setSelectOptions(res.data.results);
            };
        });
            
        return () => {
            active = false;
        };
    }, [shouldWeFetchTypes]);

    const typeHandleChange = (event: React.SyntheticEvent<Element, Event>, pokemonType: string | null) => {
        const getUrlForType = pokemonType && selectOptions.filter(type => type.name === pokemonType)[0].url;
        const prepareTypeName = pokemonType || null;
        const prepareTypeUrl = getUrlForType || null;
        const dataForSaving = {
            typeName: prepareTypeName,
            typeUrl: prepareTypeUrl,
        };
        
        dispatch(updatePokemonType(dataForSaving));
    };
    
    return (
        <Autocomplete
            open={selectIsOpen}
            onOpen={() => {
                setSelectIsOpen(true);
            }}
            onClose={() => {
                setSelectIsOpen(false);
            }}
            sx={{ width: width || 230, "&.MuiSvgIcon-root": {
                color: "white",
              } }}
            size={ size || "small" }
            noOptionsText={noOptionsText || "No Options"}
            onChange={(event: React.SyntheticEvent<Element, Event>, data: string | null) => {
                fetchWhenOpen ? typeHandleChange(event, data) : navigate(`/${data}`);
            }}
            defaultValue={fetchWhenOpen ? typeName : null}
            loading={shouldWeFetchTypes}
            options={selectOptions && selectOptions.map(({ name }:{ name: string }) => name)}
            renderInput={(params) => 
                <TextField
                    {...params}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "0",
                            padding: "0",
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                    classes={{ root: styles.inputRoot }}
                    placeholder={placeholder || "Type something..."}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {shouldWeFetchTypes ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
                
            }
            className={styles.search}
            classes={{ root: styles.autocompleteRoot }}
        />
    );
};

export default AutocompleteSelect;