WEBSITE CHÚC MỪNG 20/10 - NGUYỄN HÀ KIỀU ANH
============================================

CÁCH CHẠY TRÊN WINDOWS
1. Giải nén thư mục 20-10-kieu-anh vào nơi dễ tìm, ví dụ Desktop.
2. Mở thư mục đó.
3. Có thể nhấp đúp index.html để xem nội dung; một số trình duyệt chặn phát nhạc từ file://.
4. Để chạy ổn định cùng nhạc: mở PowerShell tại thư mục dự án, chạy lệnh:
   py -m http.server 8000
5. Mở Chrome/Edge tại địa chỉ http://localhost:8000.
6. Giữ cửa sổ PowerShell mở trong lúc dùng website; nhấn Ctrl+C để dừng máy chủ.
7. Không cần cài Node.js hay backend. Nếu máy chưa có Python, dùng đường link website đã đăng lên GitHub Pages.

CÁCH THAY ẢNH
1. Chọn ảnh có sẵn trong điện thoại/máy tính (không cần tự tạo ảnh trống).
2. Sao chép ảnh vào thư mục images trong dự án.
3. Đặt tên ảnh chân dung là kieu-anh.jpg.
4. Có thể thêm tối đa 3 ảnh kỷ niệm, đặt tên:
   ky-niem-1.jpg
   ky-niem-2.jpg
   ky-niem-3.jpg
5. Dùng ảnh JPG/JPEG và giữ đúng đuôi file. Nếu ảnh là PNG hoặc WEBP, hãy sửa đường dẫn src tương ứng trong index.html cho đúng tên và đuôi thật; chỉ đổi tên đuôi không chuyển đổi định dạng ảnh.
6. Ảnh dọc khoảng 1200 x 1500 px là vừa đẹp; nên nén ảnh để website tải nhanh trên điện thoại.
7. Làm mới trang bằng Ctrl+F5 trên máy tính.

Ví dụ cấu trúc thư mục sau khi thêm ảnh:
20-10-kieu-anh
  index.html
  style.css
  theme.css
  script.js
  images
    kieu-anh.jpg
    ky-niem-1.jpg
    ky-niem-2.jpg
    ky-niem-3.jpg
  audio
    nhac-nen.mp3

Nếu không có ảnh kỷ niệm nào thì có thể bỏ qua các file đó; khung ảnh mẫu vẫn hiện.

CÁCH ĐỔI TÊN / LỜI CHÚC / BẤT NGỜ
Mở script.js bằng Notepad hoặc VS Code.
Ở phần CONFIG gần đầu file, sửa:
- name: tên người nhận
- surprise: lời nhắn bí mật
- musicFile: đường dẫn file nhạc
Lưu file (Ctrl+S), rồi tải lại website (Ctrl+F5).

CÁCH THÊM NHẠC
1. Tạo/đặt file nhạc MP3 trong thư mục audio.
2. Đặt tên file là nhac-nen.mp3.
3. Nên dùng nhạc bạn có quyền sử dụng.
4. Website sẽ thử tự phát nhạc khi mở. Chrome/Safari thường chặn nhạc có tiếng cho đến khi có thao tác của người dùng; nếu vậy, chạm nút ♫ ở đầu trang một lần để bật.

CÁCH SỬA GIAO DIỆN
- index.html: nội dung và các mục của website.
- style.css và theme.css: màu sắc, kích thước, bố cục, hiệu ứng.
- script.js: mở thư, nhạc, trái tim và lời nhắn bất ngờ.

CÁCH GỬI WEBSITE CHO NGƯỜI KHÁC
Muốn người nhận mở bằng điện thoại qua một đường link:
1. Đăng nhập GitHub và tạo repository mới, ví dụ: 2010-kieu-anh.
2. Chọn Public, tạo repository.
3. Tải TOÀN BỘ nội dung dự án lên, bao gồm index.html, style.css, theme.css, script.js và các file ảnh/nhạc cần dùng.
4. Vào Settings > Pages.
5. Ở Build and deployment, chọn Deploy from a branch.
6. Chọn branch main và folder /(root), rồi bấm Save.
7. Chờ GitHub Pages xuất hiện đường link, thường dạng:
   https://TEN-GITHUB.github.io/2010-kieu-anh/
8. Mở link trên điện thoại để kiểm tra, sau đó gửi đường link đó cho người nhận.

Muốn gửi bản sao để người nhận tự mở trên máy tính:
1. Nén TOÀN BỘ thư mục 20-10-kieu-anh thành file ZIP.
2. Gửi file ZIP; người nhận giải nén rồi mở index.html.
3. Gửi riêng index.html là không đủ vì trang cần CSS, JavaScript và các thư mục ảnh/nhạc đi kèm.

LƯU Ý QUAN TRỌNG
- Repository Public đồng nghĩa ảnh và nội dung trên đó có thể được mọi người xem; chỉ đăng ảnh được phép chia sẻ.
- Nếu ảnh không hiện, kiểm tra ảnh đã nằm trong thư mục images chưa, tên file/đuôi file có khớp index.html không.
- Trên điện thoại nên mở bằng đường link đã đăng lên mạng; mở file HTML trực tiếp từ ZIP thường không hoạt động thuận tiện.
- Nhạc có thể không phát nếu file chưa có hoặc định dạng không phù hợp.
