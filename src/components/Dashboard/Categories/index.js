import Modal from "@/components/utils/modal";
import {
  addCategory,
  editCategory,
  getCategories,
} from "@/firebase/controllers/categories.controller";
import { useContext, useRef, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import CollectionList from "../CollectionList";
import "./styles.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { auth } from "@/firebase";
import { AuthContext } from "@/app/guest/layout";

export default function Categories({ categories, user_id }) {
  const formRef = useRef(null);
  const router = useRouter();

  const [selectedCat, setSelectedCat] = useState("");
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    category: "",
    particular: "",
    amt: "",
    acc_num: "",
  });
  const [c_id, setCId] = useState("");

  const { setAllCategory } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: auth.currentUser.uid,
        category: selectedCat,
        particular: e.target.particulars.value,
        amt: e.target.amt.value,
        acc_num: e.target.acc_num.value,
        sch: null,
      };

      const cat = await addCategory({ data, setAllCategory });

      if (cat instanceof Error) {
        toast.error(cat.message);
      } else {
        formRef.current.reset();
        toast.success(`You have added an expense to ${selectedCat}`);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getExp = async (cat) => {
    setSelectedCat(cat);
    setShowModal(true);

    if (auth.currentUser) {
      try {
        const c = await getCategories(auth.currentUser.uid, cat);

        if (c instanceof Error) {
          console.log("err", c.message);
        } else {
          console.log("succes-collection-list");

          setCategory(c);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const c = await editCategory(c_id, editData);

      if (c instanceof Error) {
        toast.error(c.message);
      } else {
        toast.success("Expense edited");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <CollectionList
            category={category}
            setCategory={setCategory}
            user_id={user_id}
            selectedCat={selectedCat}
            setIsEdt={setIsEdit}
            setShowModal={setShowModal}
            setEditData={setEditData}
            editData={editData}
            setLoading={setLoading}
            setCId={setCId}
          />
        </Modal>
      )}

      {categories.map((x) => {
        return (
          <div className="exp-con">
            <h2>Expenses categories</h2>

            <div className="exp">
              <p>
                {x.name}(€): {x.amt}
              </p>

              <FiPlusCircle onClick={() => setSelectedCat(x.name)} />
              <button onClick={() => getExp(x.name)}>view</button>
            </div>

            {selectedCat === x.name && !isEdit && (
              <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className="categories">
                  <label htmlFor="particulars">Particulars</label>
                  <input
                    type="text"
                    id="particulars"
                    name="particulars"
                    placeholder="Crunches bakery"
                  />
                </div>
                <div className="categories">
                  <label htmlFor="particulars">Amount:</label>
                  <input type="text" id="amt" name="amt" placeholder="200" />
                </div>
                <div className="categories">
                  <label htmlFor="acc_num">Acc num</label>
                  <input
                    type="text"
                    id="acc_num"
                    name="acc_num"
                    placeholder="6173637476"
                  />
                </div>
                <div className="categories">
                  <button type="submit">Add</button>
                </div>
              </form>
            )}

            {isEdit && !loading && (
              <form ref={formRef} onSubmit={(e) => handleEdit(e)}>
                <div className="categories">
                  <label htmlFor="particulars">Particulars</label>
                  <input
                    type="text"
                    id="particulars"
                    name="particulars"
                    placeholder="Crunches bakery"
                    value={editData.particular}
                    onChange={(e) =>
                      setEditData({ ...editData, particular: e.target.value })
                    }
                  />
                </div>
                <div className="categories">
                  <label htmlFor="particulars">Amount:</label>
                  <input
                    type="text"
                    id="amt"
                    name="amt"
                    placeholder="200"
                    value={editData.amt}
                    onChange={(e) =>
                      setEditData({ ...editData, amt: e.target.value })
                    }
                  />
                </div>
                <div className="categories">
                  <label htmlFor="acc_num">Acc num</label>
                  <input
                    type="text"
                    id="acc_num"
                    name="acc_num"
                    placeholder="6173637476"
                    value={editData.acc_num}
                    onChange={(e) =>
                      setEditData({ ...editData, acc_num: e.target.value })
                    }
                  />
                </div>
                <div className="categories">
                  <button type="submit">Add</button>
                </div>
              </form>
            )}
          </div>
        );
      })}
    </>
  );
}
