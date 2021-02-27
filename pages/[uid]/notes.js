import { resetServerContext } from "react-beautiful-dnd";
import cookies from "next-cookies";
import * as APIService from "../../services/apis"
import NotesPage from "../../components/notesPage/index";

const IndexPage = ({ 
  pageIdList, 
  filteredPages, 
  blocks, 
  data,
  err }) => {
  return <NotesPage 
            pageIdList={pageIdList} 
            filteredPages={filteredPages} 
            fetchedBlocks={blocks} 
            userData={data} 
            err={err} />;
};

export const getServerSideProps = async (context) => {
  resetServerContext(); // needed for drag and drop functionality
  const { token } = cookies(context);
  const uid = context.query.uid;
  const req = context.req;
  try {
    const response = await APIService.GetUserAccount(uid, token)
    const data = await response.json();
    const pageIdList = data.pages;

    const pages = await Promise.all(
      pageIdList.map(async (id) => {
        const response = await APIService.PageInfo(id, token,"GET")
        return await response.json();
      })
    );
    const filteredPages = pages.filter((page) => !page.errCode);
    return {
      props: { 
        filteredPages: filteredPages, 
        pageIdList: pageIdList, 
        data: data,
        err: false },
    };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, uid: null, creatorid: null, err: true } };
  }
};

export default IndexPage;
