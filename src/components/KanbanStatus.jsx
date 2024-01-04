import React from "react";
import KanbanWork from "./KanbanWork";
import darkenColor from "../helpers/darkenColor";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../common/ItemTypes";
import { updateWorkStatusById } from "../redux/kanbanSlice/kanbanSlice";
import { useDispatch } from "react-redux";

const KanbanStatus = ({ status }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.WORK,
    drop: (item) => {
      // Burada işlem yapabilirsiniz, örneğin çalışma durumunu güncelleyebilirsiniz
      dispatch(
        updateWorkStatusById({ workId: item.workId, statusCode: status.code })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={`flex flex-col w-1/6 p-4 gap-4 min-h-[500px] rounded-xl ${
        isOver ? "bg-gray-300" : ""
      }`}
      ref={drop}
    >
      <span
        className={`rounded-xl px-2 py-[2px] w-fit flex items-center justify-center gap-1`}
        style={{ backgroundColor: darkenColor(status.color, -0.6) }}
      >
        <span style={{ color: status.color }}>{status.name}</span>
        <span
          className="rounded-lg px-3 text-white "
          style={{ backgroundColor: status.color }}
        >
          {status.Works.length}
        </span>
      </span>
      {status.Works.map((work) => (
        <KanbanWork key={work.Id} work={work} />
      ))}
    </div>
  );
};

export default KanbanStatus;
