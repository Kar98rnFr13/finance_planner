import "./styles.css";
import { FaTimes } from "react-icons/fa";

export default function Modal({ children, onClick }) {
  return (
    <div className="modal">
      <div className="cancel">
        <FaTimes size={50} onClick={onClick} />
      </div>

      {children}
    </div>
  );
}
