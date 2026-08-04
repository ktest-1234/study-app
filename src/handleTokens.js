import axios from "axios"
import path from "node:path"

axios.create({
    baseUrl:path.join(process.env.BASE_ROUTE_GITHUB, "token", "")
})