import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface QueryArg {
  page?: number;
  search?: string;
}

/**
 * Provides endpoints for fetching Star Wars characters, their details, and related resources.
 */
export const characterSlice = createApi({
  reducerPath: 'characterSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    /**
     * Fetches a list of characters with pagination and search functionality.
     *
     * @param {Object} params - Parameters for the query.
     * @param {number} [params.page=1] - The page number to fetch.
     * @param {string} [params.search=""] - The search term for filtering characters.
     * @returns {string} The API endpoint for fetching characters.
     */
    getCharacters: builder.query<void, QueryArg>({
      query: ({ page = 1, search = '' } = {}) => {
        const suffix = search ? `?page=1&search=${search}` : `?page=${page}`;
        return `people/${suffix}`;
      },
    }),

    /**
     * Fetches details of a specific character by ID.
     *
     * @param {number|string} id - The ID of the character.
     * @returns {string} The API endpoint for fetching character details.
     */
    getCharacterDetails: builder.query({
      query: (id) => `people/${id}/`,
    }),

    /**
     * Fetches the homeworld details given the URL.
     *
     * @param {string} url - The URL of the homeworld resource.
     * @returns {Object} Query configuration for fetching the homeworld.
     */
    getHomeworld: builder.query({
      query: (url) => ({
        url,
        baseUrl: '', // No base URL override needed
      }),
    }),

    /**
     * Fetches a film's title given the film's URL.
     *
     * @param {string} url - The URL of the film resource.
     * @returns {Object} Query configuration for fetching the film title.
     */
    getFilm: builder.query<string, string>({
      query: (url) => url,
      transformResponse: (response: { title: string }) => response.title,
    }),

    /**
     * Fetches a starship's name given the starship's URL.
     *
     * @param {string} url - The URL of the starship resource.
     * @returns {Object} Query configuration for fetching the starship name.
     */
    getStarship: builder.query<string, string>({
      query: (url) => url,
      transformResponse: (response: { name: string }) => response.name,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterDetailsQuery,
  useGetHomeworldQuery,
  useGetFilmQuery,
  useGetStarshipQuery,
} = characterSlice;
