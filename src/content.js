import{useEffect} from 'react'
import{useState} from 'react'
function Content(){
    const [title,setTitle]=useState('')
    useEffect(()=>{
        console.log("mounted")
    })
  return (
      <div>
          <h1>hello hhaha</h1>
          <input
          value={title}
          onChange={e=>setTitle(e.target.value)}
          />
          {console.log("render")}
      </div>
  )
}
export default Content