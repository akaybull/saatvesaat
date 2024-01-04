import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice/loginSlice";
import kanbanSlice from "./kanbanSlice/kanbanSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    kanban: kanbanSlice,
  },
});
export default store;
