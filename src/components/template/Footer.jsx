import React from "react";
import { Multi_language } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/reducers/configSlice";
import lang from "../utils/languageConstant";
const Footer = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.value);
  // console.log(language)
  return (
    <div className="w-full bg-[#000000b1] lg:h-[40%] mt-[15%] lg:mt-[10%] px-10 lg:px-40 text-white  py-10 ">
      <p>{lang[language].Questions}</p>
      <div className="lg:flex justify-between mt-10 text-zinc-400 ">
        <div>
          <h1>{lang[language].faq}</h1>
          <h1>{lang[language].cookiePreferences}</h1>
        </div>
        <div>
          <h1>{lang[language].helpCentre}</h1>
          <h1>{lang[language].corporateInformation}</h1>
        </div>
        <div>
          <h1>{lang[language].termsOfUse}</h1>
        </div>
        <div>
          <h1>{lang[language].privacy}</h1>
        </div>
      </div>

      {/* ------------for changing language----------------- */}
      <div className=" mt-5 w-[10%] flex gap-2  ">
        <select
          name="Language"
          id=""
          onChange={(e) => dispatch(changeLanguage(e.target.value))}
        >
          {Multi_language.map((value, index) => (
            <option key={index} value={value.identifier}>
              {value.name}
            </option>
          ))}
        </select>
        <a target="_blank" href="https://www.linkedin.com/in/chirag-sindhu/">
          <i className="ri-linkedin-box-fill hover:text-blue-500 text-4xl"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
