import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Weather } from "@/types/type";
import { dateAppFormat } from "@/utils/dateAppFormat";
import { calculateDewPoint } from "@/utils/calculateDewPoint";
import { getWindDirection } from "@/utils/getWindDirection";
import Image from "next/image";
import SkeletonLoader from "../SkeletonLoader";

interface Props {
  weather: Weather | null;
  today: Date;
}

const WeatherInfo: FC<Props> = ({ weather, today }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.container__date}>
          {dateAppFormat(today, "mmmm dd, yyyy, h:MM TT", false, false)}
        </p>
        <SkeletonLoader
          isLoading={!weather}
          height={28}
          width={100}
          variant="rectangular"
        >
          <p className={styles.container__location}>
            {weather?.name}, {weather?.sys.country}
          </p>
        </SkeletonLoader>
      </div>
      <div className={styles.container__temperature}>
        <SkeletonLoader
          className={styles.icon}
          isLoading={!weather}
          height={40}
          width={40}
          variant="circular"
        >
          <div className={styles.icon}>
            <Image
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt="icon"
              width={100}
              height={100}
            />
          </div>
        </SkeletonLoader>
        <SkeletonLoader
          isLoading={!weather}
          height={40}
          width={150}
          variant="text"
        >
          <span className={styles.temperatureValue}>
            {weather?.main.temp.toFixed(1)}°C
          </span>
        </SkeletonLoader>
      </div>
      <SkeletonLoader
        isLoading={!weather}
        height={20}
        width={300}
        variant="rectangular"
      >
        <p className={styles.container__description}>
          Feels like {weather?.main.feels_like.toFixed(1)}°C,{" "}
          {weather?.weather[0].description}.
        </p>
      </SkeletonLoader>
      <ul className={styles.container__list}>
        {weather ? (
          <>
            <li>
              <span>
                {weather.wind.speed} m/s{" "}
                {getWindDirection(weather.wind.deg || 0)}
              </span>
              <span>{weather.main.pressure} hPa</span>
            </li>
            <li>
              <span>Humidity:{weather.main.humidity} %</span>{" "}
              <span>
                Dew point:{" "}
                {calculateDewPoint(
                  weather.main.temp || 0,
                  weather.main.humidity || 0
                )}{" "}
                °C
              </span>
            </li>
            <li>
              <span>Visibility:{(weather.visibility || 0) / 1000} km</span>
            </li>
          </>
        ) : (
          <SkeletonLoader
            isLoading
            height={70}
            width={200}
            variant="rectangular"
          />
        )}
      </ul>
    </div>
  );
};

export default WeatherInfo;
