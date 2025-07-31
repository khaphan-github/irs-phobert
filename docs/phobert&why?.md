# Lich su
## Trong NLP ta có sự phân cấp mức độ phát triển của pp embedding trong NLP.
1. Non-context: 
  - Giai thich ngan gon: Thuật toán xử lý: Các từ gióng nhau (Hình thức thể hiện (mặc chữ) giống nhau )- nằm trong các câu có ngữ cảnh khác nhau - các từ ấy chỉ có một value duy nhất (vector) để biểu diễn từ đó
  vd: 2 Nghìn ĐỒNG, Tôi ĐỒNG ý với bạn.
  vd thuật toán: word2vec

2. Uni-directional (1 Chiều): 
   - Giải thích ngăn gọn: Thuật toán xử lý lưu thông tin ngữ cảnh bằng cách truyền các thông tin từ node này đến node kia một chiều từ trái sang phải, vì có mô hình như vậy khi dựa vào các từ trước đó ta toàn toàn có thể xuy ra được từ tiếp theo có thể xuất hiện là gì. Điều này có nghĩa khi mô hình dự đoán từ thứ i, nó chỉ dựa trên các từ từ 1 tới i-1, không dùng các từ từ i+1 trở đi.

3. Bi-directional (hai chiều): Same same cái kia mà 2 chiều.
   - Thường nó dùng kỹ thuật transformer.

## Transformer?

## Cách tiếp cân nông và học sâu trong ứng dụng retrinign NLP
# Deeplearning co ban

# Tai sao lai BERT - Bidirectional Encoder Representation from Transformer
