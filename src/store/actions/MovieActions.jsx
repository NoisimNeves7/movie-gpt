import axios from '../../components/utils/axios'
import { addMovie } from '../reducers/movieSlice'
export { removeMovie } from "../reducers/movieSlice";
export const asyncLoadMovie = (id) => async(dispatch,state)=>{
    try {
        const details =await axios.get(`/movie/${id}`)
        const videos =await axios.get(`/movie/${id}/videos`)
        const watchProviders =await axios.get(`/movie/${id}/watch/providers`)
        const recommendations =await axios.get(`/movie/${id}/recommendations`)
        const similar =await axios.get(`/movie/${id}/similar`)
        const externalIds =await axios.get(`/movie/${id}/external_ids`)
        const credits =await axios.get(`/movie/${id}/credits`)
        const translations =await axios.get(`/movie/${id}/translations`)

        let ultimateData = {
            details:details.data,
            videos:videos.data.results.find(v=>v.type === 'Trailer'),
            watchProviders:watchProviders.data.results.IN,
            recommendations:recommendations.data.results,
            similar:similar.data.results,
            externalIds:externalIds.data,
            credits:credits.data.cast,
            translations:translations.data.translations,
        }

        dispatch(addMovie(ultimateData))
        
    } catch (error) {
        console.log("error : "+error)
    }
}