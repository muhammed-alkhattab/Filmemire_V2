import axios from "axios";

export const movie_APi =axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjUxNWU4YTFiZjlhM2EwYTk4NmRkMDZkMjM5YmExMiIsInN1YiI6IjY0N2YyNWNiY2Y0YjhiMDBlMmQ3NTI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQTOBNBAanPkX0EB_PTff8J_MZZXJ12NO3x6chxbKuU'
      }
});

export const fetchToken = async()=>{
try{
    const {data} = await movie_APi.get('/authentication/token/new')
    const token = data.request_token;
    if(data.success){
        localStorage.setItem('token', token);
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/filmpire/approved`;
    }

}
catch(error){
    console.log('Your token is invalid')
}
};

export const createSessionId = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const { data: { session_id } } = await movie_APi.post('authentication/session/new', {
                request_token: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log(error);
        }
    }
};