import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from "../interfaces/post.interface";
import { FieldPacket, QueryResult, ResultSetHeader} from "mysql2";


export async function getPosts(req: Request, res: Response): Promise<Response> {
  try {
    const pool = await connect();
    const [rows]: [QueryResult, FieldPacket[]] = await pool.query(
      "SELECT * FROM badbo"
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function getPost(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  try {
    const pool = await connect();
    const [rows] = await pool.query<Post[]>("SELECT * FROM badbo WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, salary }: Post = req.body;
  try {
    const pool = await connect();
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO badbo (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    return res.json({
      id: result.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function updatePost(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { name, salary }: Post = req.body;
  try {
    const pool = await connect();
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE badbo SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const [rows] = await pool.query<Post[]>("SELECT * FROM badbo WHERE id = ?", [
      id,
    ]);
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
}

export async function deletePost(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  try {
    const pool = await connect();
    const [rows] = await pool.query<ResultSetHeader>("DELETE from badbo WHERE id = ?", [
      id,
    ]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
}
