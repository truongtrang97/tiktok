import{useRef,useState} from 'react'
// useRef: Lưu các giá trị qua 1 tham chiếu bên ngoài

function HookUseRef(){
    const [count,setCount]=useState(60)
     let TimeId
    function HandleStart(){
      TimeId=setInterval(()=>{
         setCount(prev=>prev + 1)
      },1000)
      console.log("1",TimeId)
    }
    function HandleStop(){
        clearInterval=useRef(99)
        console.log("2",TimeId) 

    }
    return (
        <div style={{padding: 20}}>
            <h1>{count}</h1>
            <button onClick={HandleStart}>Start</button>
            <button onClick={HandleStop}>Stop</button>
        </div>
    )
}

export default HookUseRef
// mỗi hàm chạy luôn tạo ra 1 phạm vi mới và không liên quan đến phạm vi trước đó
 //sau 1s chạy lại thì setCount sẽ chạy và re-render lại component thì tạo ra 1 phạm vi mới, lúc này TimeId là underfined 
