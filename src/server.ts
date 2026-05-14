import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config/env.config";
const app: Application = express();
const PORT = config.port;

// middleware
app.use(express.json());

// connected neon db
const pool = new Pool({
  connectionString: config.connectionString,
});

// create user Table
const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(15) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);
    console.log("DataBase Connected SuccessFully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

// post route
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
      [name, email, password, age],
    );

    res.status(201).json({
      status: true,
      message: "User Create SuccessFully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

// get all data
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users
        `);

    res.status(200).json({
      status: true,
      message: "User Get SuccessFully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

// get single user data

app.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
          SELECT * FROM users
          WHERE id=$1
        `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "User Not Found",
        data: {},
      });
    }

    res.status(200).json({
      status: true,
      message: "User Get SuccessFully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

// update user
app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, is_active, age } = req.body;

    const result = await pool.query(
      `
        UPDATE users 
        SET name=COALESCE($1,name), 
            password=COALESCE($2,password), 
            is_active=COALESCE($3,is_active), 
            age=COALESCE($4,age)
            WHERE id=$5 RETURNING *
        `,
      [name, password, is_active, age, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "User Not Found",
        data: {},
      });
    }

    res.status(200).json({
      status: true,
      message: "User Update SuccessFully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});


// Delete Api user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
          DELETE FROM users
          WHERE id=$1
        `,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        status: false,
        message: "User Not Found",
        data: {},
      });
    };
   
    res.status(201).json({
      status: true,
      message: "User Deleted SuccessFully",
      data:{},
    });

  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message,
      data: error,
    });
  }
});

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "This Is Root Route",
    server_info: `This Server Running At port : ${PORT}`,
  });
});

app.listen(PORT, () => {
  console.log(`This Server Run At PORT:${PORT}`);
});
