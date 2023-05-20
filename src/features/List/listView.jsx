import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "./listSlice";
import "./styles.css";

const tableColumns = ["First Name", "Last Name", "Email", "Avatar"];

export const ListView = () => {
  const [page, setPage] = useState(1);
  const state = useSelector((state) => state.listData);
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, users, error } = state;
  const { data: userList, total_pages } = users || {};

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [page]);

  const handlePagination = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= total_pages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  const handleUserView = (userId) => {
    history(`/user/detail/${userId}`);
  };
  return (
    <>
      <h2>List Of Users</h2>
      {loading ? <div>Loading...</div> : null}
      {error && !loading ? error : null}
      <table>
        <thead>
          <tr>
            {tableColumns.map((columnName) => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userList?.map((userData) => (
            <tr key={userData.id} onClick={() => handleUserView(userData.id)}>
              <td>{userData?.first_name}</td>
              <td>{userData?.last_name}</td>
              <td>{userData?.email}</td>
              <td>
                <img
                  src={userData?.avatar}
                  alt="avt_user"
                  className="avatar_styles"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userList?.length > 0 ? (
        <div className="pagination">
          <span
            onClick={() => handlePagination(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            Prev
          </span>
          {[...Array(total_pages)].map((_, i) => (
            <span
              key={i + 1}
              className={page === i + 1 ? "pagination_selected" : ""}
              onClick={() => handlePagination(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => handlePagination(page + 1)}
            className={page < total_pages ? "" : "pagination__disable"}
          >
            Next
          </span>
        </div>
      ) : null}
    </>
  );
};
