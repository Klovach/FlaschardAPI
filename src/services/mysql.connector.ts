
import { createPool, Pool } from 'mysql';
let pool: Pool | null = null;

const initializeMySqlConnector = () => {

    try {
        console.debug("Initializing MySQL Adapter pool...");
        console.log('process.env.MY_SQL_DB_DATABASE', process.env.MY_SQL_DB_DATABASE);
        console.log('process.env.MY_SQL_DB_CONNECTION_LIMIT', process.env.MY_SQL_DB_CONNECTION_LIMIT);
        console.log('process.env.MY_SQL_PORT', process.env.MY_SQL_PORT);
        console.log('process.env.MY_SQL_HOST', process.env.MY_SQL_HOST);
        console.log('process.env.MY_SQL_USER', process.env.MY_SQL_USER);
        console.log('process.env.MY_SQL_PASSWORD', process.env.MY_SQL_PASSWORD);

        pool = createPool({
            connectionLimit:
                parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port:
                parseInt(process.env.MY_SQL_PORT != undefined ? process.env.MY_SQL_PORT : ""),
            host: process.env.MY_SQL_HOST,
            user: process.env.MY_SQL_USER,
            password: process.env.MY_SQL_PASSWORD,
            database: process.env.MY_SQL_DATABASE,
        });

        console.debug("MySQL Adaptar pool generated successfully.");
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);

        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Error connecting to MySQL Adapter: ", err);
                throw new Error("Not able to connect to database");
            }
            else {
                console.debug("MySQL Adapter connected successfully.");
                connection.release();
            }
        })
    } catch (error) {
        console.error("[mysql.connector][execute][Error]", error);
        throw new Error("Not able to connect to database");
    }
};



export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) {
            console.log("Pool not initialized"); 
            initializeMySqlConnector();
        }

        return new Promise<T>((resolve, reject) => {
            pool!.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    } catch (error) {
        console.log('[mysql.connector][execute][Error]: ', error);
        throw new Error('Failed to execute MySQL euery');
    }
}
