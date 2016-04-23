import { RECEIVE_ALBUMS, RECEIVE_ALBUMS_FAILURE } from './../mutation-types';

const state = {
    all: [],
};

const mutations = {
    [RECEIVE_ALBUMS_FAILURE](state) {
        state.all = [];
    },
    [RECEIVE_ALBUMS](state, albums) {
        state.all = albums.all;
    },
};

export default {
    state,
    mutations,
};

