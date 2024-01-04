import React from "react";
import KanbanStatus from "./KanbanStatus";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = ({ kanbanData }) => {
  return (
    <div className="w-full flex gap-16 p-4 justify-center rounded-2xl">
      <DndProvider backend={HTML5Backend}>
        {kanbanData.map((status) => (
          <KanbanStatus key={status.code} status={status} />
        ))}
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;
