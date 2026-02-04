// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({

  connectionString: "postgresql://postgres:007555@localhost:5432/postgres",
});

export default connectionPool;
