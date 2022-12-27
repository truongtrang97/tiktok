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
    
}

const HookEffect =HookEffect1

export default HookEffect