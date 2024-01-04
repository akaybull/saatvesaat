import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchKanbanData = createAsyncThunk(
  "kanban/fetchKanbanData",
  async () => {
    try {
      const response = await axios.get(
        "https://658e97192871a9866e796bee.mockapi.io/v1/WorkStatus"
      );
      localStorage.setItem("kanbanData", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    status: "idle",
    kanbanData: null,
    error: null,
  },
  reducers: {
    deleteWorkById: (state, action) => {
      const { workId } = action.payload;

      state.kanbanData = state.kanbanData.map((category) => ({
        ...category,
        Works: category.Works.filter((work) => work.Id !== workId),
      }));
    },
    updateWorkTitleById: (state, action) => {
      const { workId, workTitle } = action.payload;

      state.kanbanData = state.kanbanData.map((category) => ({
        ...category,
        Works: category.Works.map((work) =>
          work.Id === workId ? { ...work, Title: workTitle } : work
        ),
      }));
    },
    updateWorkDescriptionById: (state, action) => {
      const { workId, workDescription } = action.payload;

      state.kanbanData = state.kanbanData.map((category) => ({
        ...category,
        Works: category.Works.map((work) =>
          work.Id === workId ? { ...work, Description: workDescription } : work
        ),
      }));
    },
    updateWorkStatusById: (state, action) => {
      const { workId, statusCode } = action.payload;
      const jsonKanbanData = JSON.parse(JSON.stringify(state.kanbanData));
      const foundItem = jsonKanbanData.reduce((found, category) => {
        const foundWorkIndex = category.Works.findIndex(
          (work) => work.Id === workId
        );
        if (foundWorkIndex !== -1) {
          found = { category, foundWorkIndex };
        }
        return found;
      }, null);

      if (foundItem && foundItem.category.code !== statusCode) {
        const newData = jsonKanbanData.map((category) => {
          if (category.code === statusCode) {
            const updatedWorks = [
              ...category.Works,
              foundItem.category.Works[foundItem.foundWorkIndex],
            ];
            return { ...category, Works: updatedWorks };
          }
          return category;
        });

        state.kanbanData = newData.map((category) => {
          if (category.code === foundItem.category.code) {
            const updatedWorks = category.Works.filter(
              (work) => work.Id !== workId
            );
            return { ...category, Works: updatedWorks };
          }
          return category;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanbanData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKanbanData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kanbanData = action.payload;
      })
      .addCase(fetchKanbanData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  deleteWorkById,
  updateWorkTitleById,
  updateWorkDescriptionById,
  updateWorkStatusById,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
