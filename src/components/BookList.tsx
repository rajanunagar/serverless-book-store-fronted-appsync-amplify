import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import "@aws-amplify/ui-react/styles.css";
import { listBooks } from "../graphql/queries";
import { Book } from "../API";
import CreateOrder from "./CreateOrder";

const client = generateClient();

function DisplayPosts() {
  //   const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookId,setBookId]=useState<string>('');
  const [orderModelOpen,setOrderModelOpen]=useState<boolean>(false);
  const onClickOrder = (id:string)=>{
   setBookId(id);
   setOrderModelOpen(true);
  }

  //   const onEdit = (event:any,id:any)=>{
  //    event.stopPropagation();
  //    navigate(`/editpost/${id}`);
  //   }

  //   const onDelete = async (event,rec)=>{
  //     event.stopPropagation();

  //     if(rec.coverImage) {
  //       try {
  //         await remove({
  //           path: rec.coverImage,
  //         });
  //       } catch (error) {
  //         console.log('Error ', error);
  //       }
  //     }
  //      const post = await client.graphql({
  //       query:deletePost,
  //       variables:{
  //         input:{id:rec.id}
  //       },
  //       authMode:'userPool'
  //      });
  //      console.log(post);
  //      setMyPosts((items)=>items.filter(item=>item.id !==rec.id));
  //   }

  //   const onClickPost = (id)=>{
  //     navigate(`/posts/${id}`);
  //   }

  const getBooks = async () => {
    const result = await client.graphql({
      query: listBooks,
      variables: {
        limit: 20,
        nextToken: null,
      },
    });
    if (result.data.listBooks.books) {
      const results: Book[] = result.data.listBooks.books.filter(
        (book: Book | null) => book !== null
      ) as Book[];

      setBooks(results);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container mt-5">
        {orderModelOpen && <CreateOrder open={orderModelOpen} bookId={bookId} setOrderModelOpen = {setOrderModelOpen}/>}
      <div className="row justify-content-center text-center">
        {/* <h2>Posts</h2> */}
        <div className="table-responsive">
        <table className="table  table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) => (
              <tr key = {key}>
                <th scope="row">{key+1}</th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td onClick={()=>onClickOrder(book.bookId)}>click</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayPosts;
