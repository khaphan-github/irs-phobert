# irs-phobert

## Windows intall python 3.11 plz
## Python Virtual Environment Setup
```bash
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11 python3.11-venv

# Create virtual environment with Python 3.11.11
python3.11 -m venv venv

# Activate (Linux/macOS)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Deactivate
deactivate
```


# Source code

## Codebase Structure

### 📁 Project Architecture
```
irs-phobert/
├── src/                    # Mã nguồn chính
│   ├── preprocessing/      # Tiền xử lý dữ liệu
│   ├── vectorization/      # Chuyển đổi vector (PhoBERT)
│   ├── retrieval/          # Tìm kiếm và truy vấn
│   └── main.py            # Entry point chính
├── data/                   # Dữ liệu và lưu trữ
│   ├── processed_data/     # Dữ liệu đã xử lý
│   ├── vector/            # Vector embeddings
│   └── db/                # Database (nếu có)
├── client/                 # Web UI
│   └── index.html         # Giao diện người dùng
├── notebook/              # Jupyter notebooks
│   └── note_book.ipynb    # Thử nghiệm và phân tích
└── requirements.txt       # Dependencies
```

### 🔧 Core Components

#### 1. **Preprocessing Module** (`src/preprocessing/`)
- Tiền xử lý văn bản tiếng Việt
- Làm sạch và chuẩn hóa dữ liệu

#### 2. **Vectorization Module** (`src/vectorization/`)
- Sử dụng PhoBERT để tạo embeddings
- Thư viện: `transformers`, `sentence-transformers`
- Chuyển đổi văn bản thành vector representations

#### 3. **Retrieval Module** (`src/retrieval/`)
- Tìm kiếm similarity với `scikit-learn`
- Query processing và ranking
- Trả về kết quả tương tự nhất

#### 4. **Main Application** (`src/main.py`)
- Orchestrate toàn bộ pipeline
- API endpoints (nếu có)
- Integration với các modules

Hello Huy ne
