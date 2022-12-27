# hook
- hook : móc, gắn ( thường là gắn móc vào component)
- hook là những method , hàm được cung cấp sẵn của Reactjs
- < khi nào dùng hook naò và dùng ntn>
- <có thể tùy chỉnh hook để dùng>
+ note: tên và ý nghĩa của từng hook
- đối số nó nhận là gì
- và trả ra những gì, những cái nó trả ra thì nó hoạt động ntn

 ### HOOK chỉ dùng cho function component
 - khi dùng hook nó sẽ giúp tạo ra những component đơn giản nhưng đầy đủ tính năng
 - vòng đời của component:
   - từ lúc thêm vào Dom (thường gọi API)
   - đến lúc hoạt động (nó sẽ bị thay đổi về mặt dữ liệu)
   - đến khi nó bị gỡ khỏi domV(thường có những hoạt động , clear interval , clear timeout để tránh rò rỉ bộ nhớ hay remove eventlistener)
   - hook giúp viết code những logic xảy ra ở những thời điểm khác nhau nhưng có thể viết ở cạnh nhau
+ không cần sử dụng "this"
### khi nào thì sử dụng hook
- khi dự án mới or viết component mới
- logic nghiệp vụ cần sử dụng có tính chất OOP => dùng class component thì nó clean hơn

### useState: trạng thái của dữ liệu
- nó giúp đơn giản hóa trạng thái của dữ liệu ra giao diện người dùng
- dùng khi muốn dữ liệu thay đôỉ  thì giao diện tự động cập nhật (render lại theo giao diện )

```
const [state,setState] =useState(initstate)
```
- component được render lại sau khi setState    
- initState chỉ được dùng duy nhất 1 lần đầu tiên thôi
- setState với callback
  + đối số được truyền vào hàm setState có thể truyền vào 1 callback
- initState với callback
  + khi truyền giá trị khởi tạo là 1 hàm thì nó sẽ lấy giá trị của hàm đó return ra làm giá trị khởi tạo chớ không lấy hàm đó làm giá trị khởi tạo
- setState : thay thế state bằng state mới , chơ skhoong pải thêm vô (mà tùy logic code)

## TWO-WAY-BINDING ( ràn buộc 2 chiều)
- thường use xử lý dữ liệu (form)
- 1 chiều là chiều tương tác trên giao diện     
- 2 là chiều dữ liệu

- setState đưa ra dữ liệu mới những State chỉ nhận dữ liệu mới sau khi component đó re-render lại


- localstorage : chỉ cho lưu dạng chuỗi thâu, nên dữ liệu khác phải convert sang json

+ logic làm todolistb:
- job list lưu vào mảng
- dùng useState để lấy được value input render ra trình duyệt


- Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop
- lỗi ni hay bị chỗ event dùng setState vd: onClick={()=>setState()}

## useEffect
- cần chắc:
- event: add/remove event listener
- observer pattern: subscribe/unsubscript 
- closure
- Timers setInterval,setTimeout,clearInterval,clearTimeout
- useState
- mounted, unmounted
- toán tử ===
- callAPI

+ DÙNG KHI:
- muốn dùng Side efects: một chương trình phần mềm khi có tác động xảy ra dẫn tới dữ liệu của chương trình thay đổi
+ hay giúp viết code:
   - update DOM
   - call API
   - listen DOM events
        - croll
        - resize
   - Cleanup
        - Remove listener /unsubcript
        - Clearn timer


+ useEffect (callback,[deps])
- [deps]: là 1 mảng chứa những cái sự phụ thuộc về mặt dữ liệu ( đối số ni không bắt buộc)
- callback: đối số ni bắt buộc__ code ni để thực hiện các Side Efect (tạo ra sự thay đổi bên hoạt động chính )
+ chia làm 3 trường hợp sử dụng
   - useEffect(callback)
    + gọi callback mỗi khi component re-render
    + gọi callback mỗi khi component thêm element vào dom
   - useEffect(callback,[])
   - useEffect(callback,[deps])
- cả 3 trường hợp ni callback luôn được gọi sau khi component mounted