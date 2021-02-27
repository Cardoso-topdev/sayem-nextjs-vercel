import Notice from "../components/notice";
import UserCard from "../components/userCard";
import cookies from "next-cookies";
import * as APIService from "../services/apis"

const UsersPage = ({ users }) => {
  // console.log(users);
  let usersList = [];
  Object.entries(users).forEach(([key, value]) => {
    usersList.push(<UserCard key={key} _id={value._id} email={value.email} bio={value.bio} name={value.name}/>);
  });
  return (
    <div>
      {usersList}
    </div>    
  );
};

export const getServerSideProps = async (context) => {
  const req = context.req;
  const { token } = cookies(context);
  try {
    const res = await APIService.GetUserList(token);
    const data = await res.json()
    if (data.errCode) {
      throw new Error(data.message);
    } else {
      return { props: { users: data } };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        activated: false,
        message: err.message || "Unknown error occured!",
      },
    };
  }
};

export default UsersPage;
