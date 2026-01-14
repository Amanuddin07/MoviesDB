export const ENDPOINTS = {
    POPULAR: {
        label: "Popular",
        path: "/movie/popular",
        type: "list"
    },

    TOP_RATED: {
        label: "Top Rated",
        path: "/movie/top_rated",
        type: "list"
    },

    NOW_PLAYING: {
        label: "Now Playing",
        path: "/movie/now_playing",
        type: "list"
    },

    UPCOMING: {
        label: "Upcoming",
        path: "/movie/upcoming",
        type: "list"
    },

    MOVIE_DETAILS: {
        label: "Movie Details",
        path: (id) => `/movie/${id}`,
        type: "details"
    },

    SEARCH: {
    label: "Search",
    path: "/search/multi",
    type: "search"
    },
    
    TRENDING: {
        label: 'Trending',
        path: '/trending/all/week',
        type: 'list'
    },

    TV: {
        label: 'Tv',
        path: '/trending/tv/week',
        type: 'list'
    },

    TRAILER: {
        label: "Trailer",
        path: (type, id) => `/${type}/${id}/videos`,
        type: "video",
    },

    RECOMMENDATIONS: {
        label: "Recommendations",
        path: (type, id) => `/${type}/${id}/recommendations`,
        type: "list",
    },

    IMAGES: {
        label: "Images",
        path: (type, id) => `/${type}/${id}/images`,
        type: "list",
    },

    VIDEOS: {
        label: "Videos",
        path: (type, id) => `/${type}/${id}/videos`,
        type: "list",
    },
};
