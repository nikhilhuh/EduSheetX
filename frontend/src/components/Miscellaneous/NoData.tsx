import React from "react";
import NoDataImg from "../../assets/images/nodata.svg";

const NoData: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className="flex flex-col w-full mt-4 justify-center items-center gap-4"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <img
        src={NoDataImg}
        alt="No Data"
        className="h-[45vh] w-auto"
        data-aos="zoom-in"
        data-aos-delay="200"
      />
      <p
        className="text-gray-800 text-xl text-center"
        data-aos="fade-in"
        data-aos-delay="400"
      >
        Oops..!
        <br />
        {text}
      </p>
    </div>
  );
};

export default NoData;
