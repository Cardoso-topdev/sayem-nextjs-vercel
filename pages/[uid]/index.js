import { resetServerContext } from "react-beautiful-dnd";
import { useContext } from "react";
import cookies from "next-cookies";
import * as APIService from "../../services/apis"

import InboxPage from "../../components/inboxPage/index";

const IndexPage = ({ 
  pageIdList, 
  filteredPages, 
  data,
  err }) => {
  return <InboxPage 
            pageIdList={pageIdList} 
            filteredPages={filteredPages} 
            userData={data} 
            err={err} />;
};

export const getServerSideProps = async (context) => {
  const { token } = cookies(context);

  resetServerContext(); // needed for drag and drop functionality
  const uid = context.query.uid;
  const req = context.req;
  try {
    const res = await APIService.GetUserAccount(uid, token);

    const data = await res.json();
    const pageIdList = data.pages;
    const pages = await Promise.all(
      pageIdList.map(async (id) => {
        const response = await APIService.PageInfo(id, token, "GET")
        return await response.json();
      })
    );
    const filteredPages = pages.filter((page) => !page.errCode);
    return {
      props: { 
        filteredPages: filteredPages, 
        pageIdList: pageIdList, 
        data: data,
        err: false 
      },
    };
  } catch (err) {
    console.log(err);
    return { 
      props: { 
        blocks: null, 
        uid: null, 
        creatorid: null, 
        err: true 
      } 
    };
  }
};

export default IndexPage;
