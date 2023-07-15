import { environment } from "src/environments/environment";

 export const urlConfig = {
    json_db_local: 'http://localhost:3000/posts',
    json_db_prod: environment.API
}