import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (query: string = "", { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character${query}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          return { results: [], info: null };
        }
        return rejectWithValue(data.error || "Failed to fetch characters");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllSpecies = createAsyncThunk(
  "characters/fetchAllSpecies",
  async (_, { rejectWithValue }) => {
    try {
      let page = 1;
      let allCharacters: any[] = [];
      let nextPage = true;

      while (nextPage) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        nextPage = !!data.info.next;
        page++;
      }

      const speciesSet = new Set(allCharacters.map((char) => char.species));
      const speciesArray = Array.from(speciesSet).sort();

      return speciesArray;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface FilterState {
  search: string;
  status: string[];
  species: string[];
  gender: string[];
}

interface InfoType {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface CharacterState {
  characters: any[];
  loading: boolean;
  error: string | null;
  info: InfoType | null;
  filters: FilterState;
}

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
  info: null,
  filters: {
    search: "",
    status: [],
    species: [],
    gender: [],
  },
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.error = null;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.results || [];
        state.info = action.payload.info;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Something went wrong";
        state.characters = [];
        state.info = null;
      });
  },
});

export const { setFilter, clearFilters } = characterSlice.actions;
export default characterSlice.reducer;
