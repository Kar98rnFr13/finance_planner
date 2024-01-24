import {
  deleteCategory,
  getCategories,
  getCategory,
} from "@/firebase/controllers/categories.controller";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "./styles.css";
import { toast } from "react-toastify";

export default function CollectionList({
  setIsEdt,
  setShowModal,
  category,
  selectedCat,
  setEditData,
  setLoading,
  setCId,
  user_id,
  setCategory,
}) {
  const getEditCategory = async (c_id) => {
    try {
      setLoading(true);
      const c = await getCategory(c_id);

      if (c instanceof Error) {
        console.log("err", c.message);
        setLoading(false);
      } else {
        setEditData(c);
        console.log(c);
        setCategory(c);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const deleteCat = async (c_id) => {
    try {
      setLoading(true);
      const c = await deleteCategory(c_id, user_id, selectedCat);

      if (c instanceof Error) {
        toast.error(c.message);
        setLoading(false);
      } else {
        toast.success("Expense delted");
        setCategory(c);
        setLoading(false);
      }
    } catch (error) {
    toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cl">
        <h2>{selectedCat} category</h2>

        {category.map((x) => {
          return (
            <div className="cl-div">
              <div className="icons">
                <MdEdit
                  onClick={() => {
                    setIsEdt(true);
                    setShowModal(false);
                    setCId(x.id);
                    getEditCategory(x.id);
                  }}
                />
                <MdDelete
                  onClick={() => {
                    setIsEdt(true);
                    setCId(x.id);
                    deleteCat(x.id);
                  }}
                />
              </div>
              <div className="cl-div-item">
                <p>Category: {x.category}</p>
                <p>Particular: {x.particular}</p>
              </div>
              <div className="cl-div-item">
                <p>Acc: {x.acc_num}</p>
                <p>Amt: {x.amt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
