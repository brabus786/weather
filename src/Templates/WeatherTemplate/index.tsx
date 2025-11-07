import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import WeatherInfo from '@/Components/WetherInfo';
import { WeatherContext } from '@/pages/weather';
import dynamic from 'next/dynamic';
import SearchCity from '@/Components/SearchCity';
import LinearProgress from '@/Components/LinearProgress';
import { useProcessWatcher } from '@/hooks/useProcessWatcher';

const Map = dynamic(() => import('@/Components/Map'), { ssr: false });

const WeatherTemplate: FC = () => {

  const context = useContext(WeatherContext);
  const isLoading = useProcessWatcher('get_current_weather');

  if (!context) return null;
  const { currentWeather, getWeatherHandler, today } = context;

  return (
    <div className={cx('container', styles.container)} >

      {isLoading && <LinearProgress className={cx(styles.progress)} />}

      <WeatherInfo
        weather={currentWeather}
        today={today}
      />

      <div className={styles.map}>
        {
          currentWeather && (
            <Map
              key={currentWeather.name}
              lat={currentWeather.coord.lat}
              lng={currentWeather.coord.lon}
            />
          )
        }
      </div>

      <SearchCity
        onSubmit={getWeatherHandler}
        city={currentWeather?.name}
        isLoading={isLoading}
      />
    </div>
  )
}
export default WeatherTemplate;