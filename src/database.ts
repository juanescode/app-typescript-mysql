import { createPool, Pool } from "mysql2/promise";

let pool: Pool;

export async function connect(): Promise<Pool> {
  if (pool){
    return pool    
  }


  try {
    pool = await createPool({
      host: "localhost",
      user: "root",
      database: "hoxwal",
      connectionLimit: 10,
    });

    await pool.query("SELECT 1");
    console.log("Database is connected");
    return pool
  } catch (err) {
    console.log("Database is not connected:", err);
    throw err
  }
}

