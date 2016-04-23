import { RECEIVE_ARTISTS, RECEIVE_ARTISTS_FAILURE } from './../mutation-types';

const state = {
    all: [],
};

const mutations = {
    [RECEIVE_ARTISTS_FAILURE](state) {
        state.all = [];
    },
    [RECEIVE_ARTISTS](state, artists) {
        state.all = artists.all;
    },
};

export default {
    state,
    mutations,
};

