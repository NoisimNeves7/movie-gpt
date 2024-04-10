import axios from "../../components/utils/axios";
import { loadTv } from "../reducers/tvSlice";
export {removeTv} from "../reducers/tvSlice";

export const asyncLoadTv = ({id}) => async (dispatch) => {
  try {
    const details = await axios.get(`tv/${id}`);
    const credits = await axios.get(`tv/${id}/credits`);
    const externalIds = await axios.get(`tv/${id}/external_ids`);
    const recommendations = await axios.get(`tv/${id}/recommendations`);
    const similar = await axios.get(`tv/${id}/similar`);
    const translations = await axios.get(`tv/${id}/translations`);
    const videos = await axios.get(`tv/${id}/videos`);
    const watchProviders = await axios.get(`tv/${id}/watch/providers`);

    let ulitmateData = {
        details:details.data,
        credits:credits.data.cast,
        externalIds:externalIds.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        translations:translations.data.translations,
        videos:videos.data.results.find(d => d.type === 'Trailer'),
        watchProviders:watchProviders.data.results.IN,
    }
    console.log(ulitmateData)
    dispatch(loadTv(ulitmateData))
  } catch (error) {
    console.log("error : " + error);
  }
};
