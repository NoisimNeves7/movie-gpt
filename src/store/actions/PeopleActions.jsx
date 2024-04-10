import axios from '../../components/utils/axios'
import { loadPeople } from '../reducers/peopleSlice'

export {removePeople} from '../reducers/peopleSlice'

export const asyncLoadPeople = ({id}) => async(dispatch)=>{
    try {
        const details =await axios.get(`/person/${id}`)
        const combinedCredits =await axios.get(`/person/${id}/combined_credits`)
        const externalIds =await axios.get(`/person/${id}/external_ids`)
        const movieCredits =await axios.get(`/person/${id}/movie_credits`)
        const tvCredits =await axios.get(`/person/${id}/tv_credits`)
        
        let ultimateData = {
            details:details.data,
            combinedCredits:combinedCredits.data,
            movieCredits:movieCredits.data,
            tvCredits:tvCredits.data,
            externalIds:externalIds.data,
        }
        dispatch(loadPeople(ultimateData))
        // console.log(ultimateData)
    } catch (error) {
        console.log("error :", error)
    }
}