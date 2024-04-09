import axios from "axios";

const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTA0OGU5MThiNmFiYjU1NDljOTU0MzExYTI1NjE3ZSIsInN1YiI6IjY2MDAwODAyYjg0Y2RkMDE3ZGY1M2JiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSAjuE60aYsoY1UTI28T9Ub7IBb5Tq6aV-0RaqUrkw4'
      }
})

export default instance;