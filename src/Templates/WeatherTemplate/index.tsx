import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import WeatherInfo from '@/Components/WetherInfo';
import { WeatherContext } from '@/pages';
import dynamic from 'next/dynamic';
import SearchCity from '@/Components/SearchCity';

const Map = dynamic(() => import('@/Components/Map'), { ssr: false });

const WeatherTemplate: FC = () => {

  const context = useContext(WeatherContext);
  if (!context) return null;
  const { currentWeather, getWeatherHandler } = context;

  return (
    <div className={cx('container', styles.container)} >
      <WeatherInfo
        weather={currentWeather}
      />
      {
        currentWeather && (
          <Map
            key={`${currentWeather.coord.lat}-${currentWeather.coord.lon}`}
            lat={currentWeather.coord.lat}
            lng={currentWeather.coord.lon}
          />
        )
      }
      <SearchCity
        onSubmit={getWeatherHandler}
        city={currentWeather?.name}
      />
    </div>
  )
}
export default WeatherTemplate;