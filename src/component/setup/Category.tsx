import React, { useEffect } from "react";

import { useRecoilState } from "recoil";
import { dataState } from "../../store/state/example";

import styled from "styled-components";

const Category = () => {
  const [info, setInfo] = useRecoilState(dataState);

  const getData = async () => {
    const response = await fetch("/data.json", { method: "GET" });
    const data = await response.json();
    setInfo(data.data);
  };

  useEffect(() => {
    getData();
  });

  const infoSort = (name: string) => {
    let newArr = [];
    for (let i = 0; i < info.length; i++) {
      if (info.map((data) => data.sort)[i] === name) {
        newArr.push(info[i]);
      }
    }
    return newArr;
  };

  return (
    <CategoryContainer>
      <WeatherCategory>
        <WeatherCategoryTitle>🌤 대기</WeatherCategoryTitle>
        {infoSort("대기").map((data) => (
          <WeatherCategoryButton key={data.category}>
            <span>{data.title}</span>
            <DotsImage src="/assets/dots.png" alt="dots" />
          </WeatherCategoryButton>
        ))}
      </WeatherCategory>
      <WeatherCategory>
        <WeatherCategoryTitle>☔️ 강수</WeatherCategoryTitle>
        {infoSort("강수").map((data) => (
          <WeatherCategoryButton key={data.category}>
            <span>{data.title}</span>
            <DotsImage src="/assets/dots.png" alt="dots" />
          </WeatherCategoryButton>
        ))}
      </WeatherCategory>
      <WeatherCategory>
        <WeatherCategoryTitle>💨 바람</WeatherCategoryTitle>
        {infoSort("바람").map((data) => (
          <WeatherCategoryButton key={data.category}>
            <span>{data.title}</span>
            <DotsImage src="/assets/dots.png" alt="dots" />
          </WeatherCategoryButton>
        ))}
      </WeatherCategory>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div``;

const WeatherCategory = styled.div`
  margin: 0.3rem 0 1rem 0;
  padding: 1rem 0 0 0;
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const WeatherCategoryTitle = styled.p`
  margin: 0 0 0.5rem 0;
`;

const WeatherCategoryButton = styled.button`
  ${(props) => props.theme.flex.flexBox()};
  position: relative;
  width: 100%;
  height: 2rem;
  margin: 0.3rem 0;
`;

const DotsImage = styled.img`
  width: 1rem;
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
`;

export default Category;
