import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";

export const UserDetails = () => {
  const state = useSelector((state) => state.listData);
  const params = useParams();

  const { users } = state;
  const { data: userList } = users || {};

  const currentUser = userList?.find((item) => item.id === params.id * 1);
  const { first_name, last_name, email, avatar } = currentUser || {
    avatar: "",
  };

  if (!currentUser) return <h3>No data Found </h3>;

  return (
    <div className="card">
      <img src={avatar} alt="user_img" />
      <h1>
        {first_name} {last_name}
      </h1>
      <p class="email">Contact: {email}</p>
    </div>
  );
};

export default UserDetails;
