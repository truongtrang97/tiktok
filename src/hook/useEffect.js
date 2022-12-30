import {useEffect,useState} from 'react'
// --Ứng dụng F8 blog title
function HookEffect1(){
    const [title,setTitle]= useState('')
    useEffect(()=>{
        console.log("vao used effect")
        document.title=title
    })


// document.title =title //kết quả vẫn tương tự nếu đặt ở đây nhưng nếu đây là 1 logic dài thì rất lâu dữ liệu mới được render, hoặc 1 logic làm chăn việc render dữ liệu
// do đó ta mới dùng useEffect để xử lý công việc phụ này còn việc chính vẫn là render
return (
    <div>
        <input 
        value={title}
        onChange={e=>{
            console.log('render')
            setTitle(e.target.value)
        }}
        />
    </div>
)
}
// -----Ứng dụng CALL API bằng useEffect
//không dùng useEffect, useState để render dữ liệu nên fetch chỉ chạy 1 lần khi chương trình bắt đầu chạy từ trên xuống dưới
// Nhược điểm : kiểu viết lưng chừng bên ngoài như ri mỗi khi chạy lại component thì lại gọi fectch, chưa tính đến việc setState trong component
//  thêm nữa nếu fetch chạy lâu hay bị lỗi sẽ làm hỏng công việc chính là render lại dữ liệu ra DOM
function HookEffect2(){
    // fetch ni trả về 1 promiselà 1 luồng data
    // luồng data đó trả về 1 promise khác là json data
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res=>{
        console.log("getdata")
        return res.json()//hay code sai chỗ ni
    })
    .then((logdata)=>{
        console.log(logdata)
    })
    .catch(()=>{
        console.log('API error')
    })
    return (<div>
        postdata
        </div>)
}
// th2 : dùng useEffect TH1 , không dùng setState để render lại dữ liệu nên fetch chỉ gọi 1 lần khi component được mount vào App thì callback được gọi

function HookEffect3(){
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>{
            return res.json()
        })
        .then((data)=>console.log(data))
    }
    )
    return <div>hello</div>
}

// th3: dùng useEffect vad useState để render lại dư liệu nên sẽ gọi fetch liên tục mỗi khi dữ liệu được render//có thể đứng máy
//  vì khi component được mounted sẽ gọi callback, trong khi callback lại gọi fetch , fecth lại có setState render lại dữ liệu, mà khi render lại dữ liệu thì callback được gọi, callback thì gọi fetch , fetch thì có setState .. vòng lặp vô tận
//  nên ta sẽ dùng useEffect trường hợp 2
function HookEffect4(){
    const [datas,setDatas]=useState([])
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>{
            return res.json()
        })
        .then((data)=>setDatas(data))
    },[])
    return <div>
        {datas.map(data=>{return <li>{data.title}</li>})}
           </div>
}
// ----Dùng useEffect th3 , có mảng với biến phụ thuộc
// Callback được gọi mỗi khi deps thay đổi giá trị (deps là 1 biến)
// vd xây dựng 1 tabar mỗi lần bấm vào tab nòa thì callAPI và render dữ liệu API đó

function HookEffect5(){
    const tabs=["posts","comments","albums"]//cho ni bij loi viet sai loi chinh ta

    const [posts,setPosts]=useState([])
    const [type,setType]=useState("posts")
    // [deps] :deps nói chung là 1 biến , có thể là 1 props truyền từ ngoài vào , một state của useState,...
    // Khi chạy tới useEffect sẽ kiểm tra giá trị deps trước khi render và sau khi render có thay đổi hay không, nếu thay đổi thì gọi callback.
    // code ni chạy như ri:
    // B1: Code chạy từ trên xuống , lần đầu tiên khi component được mounted nên gặp useEffect sẽ gọi callback callAPI lần 1
    // B2: Trong callback có setPosts render lại dữ liệu và lại gặp useEffect, useEffect kiểm tra deps trước và sau khi render có thay đổi hay không
    //   ở bước này type chưa thay đổi nên callback không được gọi
    // B3: sau khi render lại dữ liệu với data nhận từ API ở bước 1. Và chờ khi có sự thay đổi deps-type thì sẽ gọi callback callAPI và nhận lại data mới
    // khi bấm click vào một trong 3 button, thì sẽ gọi setType và render lại dữ liệu , trong khi render lại dữ liệu tới dòng useEffect thấy deps-type thay đổi
    // nên callback callAPI được gọi và lấy dữ liệu mới render lại lên web
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res=>{
            return res.json()
        })
        .then(data=>{console.log(data)
            setPosts(data)}
     )
    },[type])
     function handleClick(tab){
         setType(tab)
     }
    return(
        <div style={{padding:20}}>
            {tabs.map((tab)=>
                <button
                key={tab}
                style={type ===tab ?{color:"#fff",backgroundColor:"#333",}:{}}
                onClick={()=>handleClick(tab)}
                >
                  {tab}
                </button>
              
            )}
              {posts.map((post)=>{return <li key={post.id}>{post.title}</li>})}
        </div>
    )
}
// ---Hết lý thuyết

// --- Ứng dụng của useEffect
// 1.Ứng dụng với DOM event : 
function HookEffect6()
{
    const tabs = ["posts", "albums", "comments"]
    const [type, setType] = useState("posts")
    const [posts, setPosts] = useState([])
    const [showGoToTop, setShowGoToTop] = useState(false)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setPosts(data)
            })
            .catch(() => {
                console.log("API lỗi")
            })
    }, [type])

    useEffect(() => {
        function handleScroll()
        {
            setShowGoToTop(window.scrollY > 200)
            console.log("set state")
        }
        window.addEventListener("scroll", handleScroll)
        console.log("mounted - addEventListener")

        // function được return là cleanup function sẽ được gọi mỗi khi component được unmounted để dọn dẹp.
        return () => {
            window.removeEventListener("scroll", handleScroll)
            console.log("Unmounted - removeEventListener")
        }
    }, [])

    return (
        <div style={{padding: 20}}>
            {tabs.map((tab) => {
                return <button
                            key={tab}
                            style = {tab === type ? {color: "#fff", backgroundColor: "#333"}:{}}
                            onClick={() => setType(tab)}
                        >
                        {tab}
                        </button>
            })}
            <ul>
                {posts.map((post) => {
                    return <li key={post.id}>{post.title || post.name}</li>
                })}
            </ul>
            {showGoToTop && <button style={{position: 'fixed', right: 20, bottom: 50 }}>Go To Top</button>}
        </div>
    )
}

// Ví dụ 2 hiển thị kích thước chiều ngang màn hình(resize), khi thay đổi thì cập nhập lại
function HookEffect7()
{
    const [size, setSize] = useState(window.innerWidth)
    // Dùng sự kiện resize element để update lại state
    // dùng DOM event thì phải đưa vào useEffect và đối số thứ hai là mảng rỗng
    useEffect(() => {
        function handleResize()
        {
            setSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)

        // Clean up function
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div style={{padding: 20}}>
            <h1>{size}</h1>
        </div>
    )
}

function HookEffect8()
{
    const [countdown, setCountDown] = useState(180)
    
    // dùng setInterval - mặc định hàm setInterval là sau một khoảng thời gian sẽ gọi lại hàm truyền vào
    useEffect(() => {
            const intervalID = setInterval(() => {
                    // setCountDown(countdown - 1) nếu dùng cách này biến countdown được tham chiếu từ bên ngoài nên hàm setInterval có tính chất closure
                    // nên countdown sẽ luôn giữ giá trị 180.
                    setCountDown(prev => prev - 1)

                    // giả sử không cleanup setInterval khi unmounted thì hàm này vẫn chạy ngầm bên trong
                    console.log("Counting ...")
                }, 1000)
            
            // clean up setInterval để unmounted component thì hàm setInterval không còn được chạy
            return () => clearInterval(intervalID)
        }, [])
    

    // Dùng setTimeout thì cần thêm deps để khi deps thay đổi sẽ gọi lại callback.
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCountDown(countdown - 1)
    //     }, 1000)
    // }, [countdown])
    
    return (
        <div style={{padding: 20}}>
            <h1>{countdown}</h1>
        </div>
    )
}

const HookEffect =HookEffect5

export default HookEffect