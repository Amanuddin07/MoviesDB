import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, onKeyDown }) {
  return (
    <div
      className="search-container"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        width: "260px",
        borderRadius: "100px",
        background: "rgba(255, 255, 255, 0.18)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.24)",
      }}
    >
      <FiSearch size={18} color="#fff" />

      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "15px",
        }}
      />
    </div>
  );
}

//   <div className="">
//               <FiSearch size={18} color="#fff" />
//             <input
//               className="search"
//               onChange={(e) => setSearch(e.target.value)}
//               value={search}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   navigate(`/search/${search}`);
//                 }
//               }}
//               type="text"
//               name="search"
//               id="search"
//               placeholder="Search here"
//             />
//             </div>