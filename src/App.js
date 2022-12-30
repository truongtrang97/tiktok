import Content from './content.js'
import {useState} from 'react'
import HookEffect from './hook/useEffect.js'
import HookUseRef from './hook/useRef.js'
const order=[10,20,300]
const gifts=[
  "123",
  "trangtrang",
  "hahah",
  "nononono"
]
const courses =[
  {
    id:1,
    name:"Course1"
  },
  {
    id:2,
    name:"Course2"
  },
  {
    id:3,
    name:"Course3"
  },
]
function App() {
  const [count,setCount]= useState(()=>{
    const total=order.reduce((total,cur)=>total+cur)
    return total
  })
  // const handlecount=()=>{
  //   setCount(count+1)
  //   setCount(count+1)
  //   setCount(count+1)
  // }
  // 3 giá trị count đều là 1 giá trị nên render ra chỉ tăng lên 1

  const handlecount =()=>{
    setCount(prev=>prev+1)
    setCount(prev=>prev+1)
    setCount(prev=>prev+1)
    setCount(prev=>prev+1)
  }

  const[gift, setGift]=useState()
  const randomgift=()=>{
    setGift(gifts[Math.floor(Math.random()*gifts.length)])
  }

  const [name,setName]=useState()
  const [email,setEmail]=useState()
  // console.log({name,email})
  const handlesubmit=()=>{
    // chỗ ni là CALL API
    // console.log({name,email})
  }
  // đưa hết những id mình đã check vào 1 mảng, bỏ check thì xóa id đó ra khỏi mảng
  const [checked,setChecked]=useState([])
  const handleCheck =(id)=>{
    setChecked(prev=>{
      const isChecked=checked.includes(id)
      // console.log(checked.filter(a => a !== id))
      if(isChecked){
        return(checked.filter(a => a !== id))
      }
      else{
        return [...prev,id]
      }
    })
  }

  // console.log(checked)

  // todo list
  // lưu vào storage
  const storageJob= JSON.parse(localStorage.getItem('jobs'))
  // console.log(storageJob)
  const[job,setJob]=useState()
  const[jobs,setJobs]=useState(storageJob??[])
  
  const handleadd=()=>{
    setJobs(prev=>{
      const newjob=[...prev,job]
      //  save  to local storage
      const jsonJob=JSON.stringify(newjob)
      localStorage.setItem('jobs',jsonJob)
      return newjob
    })

  }
  const[show,setShow]=useState(false)

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={handlecount}>increase</button>
      <h2>{gift||"Chưa có phần thưởng"}</h2>
      <button onClick={randomgift}>lấy thưởng</button>
      <div>
        <input
        value={name}
        type="text"
        onChange={e=>setName(e.target.value)}
        />
        <br/>
        <input
        value={email}
        type="email"
        onChange={e=>setEmail(e.target.value)}
        />
        <button onClick={handlesubmit}>submit</button>
        {/* <button onClick={()=>setName("nguyễn văn a")}>change</button> */}
        <br/>
        <div>
          {
            courses.map(course =>(
              <div key={course.id}>
                <input
                type="checkbox"// 
                checked={checked.includes(course.id)}//đoạn ni ss oki -> true thì checked , false thì không check 
                // onChange={()=>setChecked(course.id)}//setChecked  set lại giá trị id thì check cũng nhận giá trị id+++
                onChange={()=>handleCheck(course.id)}
                />
                {course.name}
              </div>
            )         
            )}
        </div>
        <br />
        <div >
         <label>TODO LIST</label>
         <input 
          value={job}
          onChange={e=>setJob(e.target.value)}
         />
         <button onClick={handleadd}>ADD</button>
         <br/>
         <ul>
           {jobs.map((job,index)=>
           <li key={index}>{job}</li>
           )}
         </ul>
        </div>
      </div>
      <br/>
      <button onClick={()=>setShow(!show)}>TOGGLE</button>
      {show && <Content />}
      <br/>
      <HookEffect />
      <HookUseRef/>
    </div>
    
  );
}

export default App;
//  sau khi goi setCount thì hàm App sẽ được gọi
//  ỨNG DỤNG : Khi submit form không cần getel nữa mà ta chỉ cần lấy value thâu
//  thêm key vào cho vào thẻ bự nhất để warning