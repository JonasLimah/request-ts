
import { ChangeEvent, useEffect,useState } from "react"
import { Posts } from "./types/posts";


function App() {
  useEffect(()=>{
    loadinPosts();
  },[]);
  
  const loadinPosts = async () => {
    setLoading(true) 
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
     let json = await response.json();
     setLoading(false)
     setPosts(json);
  }
  const handleAddTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setAddTitle(e.target.value);
  }
  const handleBody = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setAddBody(e.target.value);
  }
  
  async function handleAddClick() {
    if(addTitle && addBody) {
      const post = await fetch("https://jsonplaceholder.typicode.com/posts",{
      method: "POST",
      headers: {
        "Contente-Type" : "application/json"
      },
      body: JSON.stringify({
        title: addTitle,
        body: addBody,
        userId: 1
      })});
      let json =  await post.json();
      if(json.id){
        alert("post adicionado com sucesso.")
      }else {
        alert("ocorreu algum erro.")
      }
      
    }else {
      alert("preencha os campos!")
    }
    
  };
  const [addTitle,setAddTitle] = useState("");
  const [addBody,setAddBody ] = useState("");
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loadin, setLoading] = useState<boolean>(false);
    return (
    <div>
         <fieldset>
            <legend>Adicionar novo post</legend>
            <input 
            onChange={handleAddTitle}
            value={addTitle} type="text" placeholder="adicionar titulo"/>
            <textarea 
            onChange={handleBody}
            value={addBody}></textarea>
            <button onClick={handleAddClick}>Enviar</button>
        </fieldset>
        {!loadin && posts.length > 0 &&
        <>
          <div>
          Total de comentarios: {posts.length}
          </div>
        
          <div>
            {posts.map((item,index)=>(
              <div key={index}>
                <h4>
                  {item.title}
                </h4>
              <small>#{item.id} - usuario{item.userId}</small>
              <p>{item.body}</p>
              <hr />
              </div>
            ))}
          </div>
        
        </>
        }
        
        {loadin &&
        <div>
          carregando...
        </div>
        }
       
        {!loadin && posts.length === 0 &&
            <div>Algo de errado não esta certo!!!</div>
        }

    </div>
  )
}

export default App
