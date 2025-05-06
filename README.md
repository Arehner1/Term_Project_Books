1. Clone Repo
2. Install Dependencies (npm install)
3. Before starting server run sql commands for
   - run sqlite3 tales_and_tomes.db < drop_tables.sql if db needs reset
     then run:
   - sqlite3 tales_and_tomes.db < create_tables.sql
   - sqlite3 tales_and_tomes.db < insert_categories.sql
   - sqlite3 tales_and_tomes.db < insert_products.sql
5. Run node server.js
6. Vist at http://localhost:3000


