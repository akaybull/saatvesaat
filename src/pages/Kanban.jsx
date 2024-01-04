import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKanbanData } from "../redux/kanbanSlice/kanbanSlice";
import Header from "../components/Header";
import KanbanBoard from "../components/KanbanBoard";

const Kanban = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchKanbanData());
    document.title = "Kanban Board";
  }, []);
  const kanbanData = useSelector((state) => state.kanban.kanbanData);
  const kanbanStatus = useSelector((state) => state.kanban.status);

  return kanbanStatus === "succeeded" ? (
    <div className="w-full h-full bg-[#eef6fa]">
      <Header />
      <KanbanBoard kanbanData={kanbanData} />
    </div>
  ) : (
    <div className="w-full h-full flex flex-col  justify-start bg-[#eef6fa]">
      <Header />
      <div className="flex items-center justify-center">
        Kanban Board Yükleniyor
      </div>
    </div>
  );
};

export default Kanban;
