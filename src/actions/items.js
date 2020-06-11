const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

export function itemsHasErrored(bool) {
    return {
        type: ITEMS_HAS_ERRORED,
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(users) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        users
    };
}



export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((users) => {

                dispatch(itemsFetchDataSuccess(users));
            })
            .catch(() => dispatch(itemsHasErrored(true)));

    };
}