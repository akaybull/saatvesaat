import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../common/ItemTypes"; // ItemTypes dosyanızı oluşturun
import {
  deleteWorkById,
  updateWorkDescriptionById,
  updateWorkTitleById,
} from "../redux/kanbanSlice/kanbanSlice";

const KanbanWork = ({ work }) => {
  const [title, setTitle] = useState(work.Title);
  const [description, setDescription] = useState(work.Description);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WORK,
    item: { workId: work.Id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    dispatch(
      updateWorkTitleById({ workTitle: e.target.value, workId: work.Id })
    );
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    dispatch(
      updateWorkDescriptionById({
        workDescription: e.target.value,
        workId: work.Id,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteWorkById({ workId: work.Id }));
  };

  const calculateRows = (text) => {
    const lineCount = text.length / 20 + 1;
    return lineCount;
  };

  return (
    <div
      ref={drag}
      className={`w-full flex flex-col border-l-green-700 border-l-4 gap-4 mt-2 shadow-lg bg-white rounded-xl ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <textarea
        type="text"
        className="p-2 mt-2 text-black font-medium hover:bg-slate-100 focus:bg-slate-100"
        value={title}
        onChange={handleTitleChange}
        rows={calculateRows(title)}
        placeholder="Başlık Ekle"
      />
      <textarea
        type="text"
        className="p-2 text-sm hover:bg-slate-100 focus:bg-slate-100"
        value={description}
        onChange={handleDescriptionChange}
        rows={calculateRows(description)}
        placeholder="Açıklama Ekle"
      />
      <div className="flex items-end justify-end">
        <button className="w-fit p-1" onClick={handleDelete}>
          &#128465;
        </button>
      </div>
    </div>
  );
};

export default KanbanWork;
