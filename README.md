# DirectFarm — Direct Farmer-to-Consumer Agricultural Marketplace

**DirectFarm** is an AgriTech marketplace and supply chain disintermediation platform that connects agricultural producers directly with end consumers. By eliminating brokers and middlemen, DirectFarm guarantees fair remuneration for farmers while ensuring consumers receive fresh farm produce at competitive market prices.

---

## 🌾 Core Capabilities

### 👨‍🌾 Farmer Portal
- **Inventory & Crop Listing**: Easily upload, categorize, and price newly harvested produce with images and quantity metrics.
- **Order Management**: Monitor incoming consumer orders, track fulfillment states, and review delivery schedules.
- **Sales Analytics & History**: Transparent record of lifetime earnings, order volumes, and customer transactions.

### 🛒 Consumer Portal
- **Browse & Search Produce**: Real-time marketplace featuring seasonal vegetables, grains, fruits, and organic farm goods.
- **Product Details & Transparency**: View detailed crop specifications, grower profiles, and harvesting origin.
- **Interactive Agri-Chatbot**: Built-in chatbot assistant guiding users with product inquiries, delivery status, and order support.
- **Order Tracking**: Seamless checkout experience with comprehensive past purchase history.

---

## 🏛️ System Architecture

```
DirectFarm/
├── FrontEnd/                # React.js SPA Client
│   ├── src/
│   │   ├── farmer_home.js          # Farmer dashboard & inventory control
│   │   ├── consumer_home.js        # Consumer marketplace showcase
│   │   ├── upload_product.js       # Agricultural listing upload form
│   │   ├── chatbot.js              # Real-time interactive shopping assistant
│   │   ├── orders.js               # Order fulfillment management
│   │   └── history.js              # Ledger of completed transactions
├── PHP/                     # Backend API & Business Logic
│   ├── start.php                   # Database connection & CORS initialization
│   ├── getUserData.php             # User profile & authentication data
│   ├── upload_product.php          # Crop catalog ingestion API
│   ├── orders.php                  # Order processing & state updates
│   ├── manage_farmer.php           # Producer verification & profile handling
│   └── history.php                 # Transaction history retrieval API
└── DataBase/                # Relational Database Schemas & Dumps
    ├── nexus_users.sql             # User authentication & role records
    ├── products_nexus.sql          # Product catalog and stock schema
    ├── orders_nexus.sql            # Order fulfillment and line items schema
    └── images_nexus.sql            # Product media mappings
```

---

## 🛠️ Technology Stack

- **Frontend**: [React.js](https://react.dev/), Context API, Modern CSS3
- **Backend API**: PHP (RESTful endpoints, JSON responses)
- **Database**: MySQL / MariaDB (Relational schema with foreign key integrity)

---

## 🚀 Setup & Installation

### 1. Database Configuration
1. Start your MySQL server (via XAMPP, WampServer, or native MySQL).
2. Create a database named `directfarm` (or as configured in `PHP/start.php`).
3. Import the database schemas located in `DataBase/`:
   ```bash
   mysql -u root -p directfarm < DataBase/nexus_users.sql.sql
   mysql -u root -p directfarm < DataBase/products_nexus.sql
   mysql -u root -p directfarm < DataBase/orders_nexus.sql
   mysql -u root -p directfarm < DataBase/images_nexus.sql
   ```

### 2. Backend Setup
1. Host the `PHP/` directory in your web server root (e.g., `C:/xampp/htdocs/directfarm/api` or via PHP built-in server):
   ```bash
   cd PHP
   php -S localhost:8000
   ```
2. Adjust DB credentials in `PHP/start.php` if required.

### 3. Frontend Setup
1. Navigate to the `FrontEnd/` directory:
   ```bash
   cd FrontEnd
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

---

## 📄 License
Developed with ❤️ by [Kabhilan VS](https://github.com/Kabhilan-VS-05). All rights reserved.
