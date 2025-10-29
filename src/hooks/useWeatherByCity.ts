import { getWeatherByCity } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useWeatherByCity = (city: string) => {
    return useQuery({
        queryKey: ['weather', city],
        queryFn: () => getWeatherByCity(city),
        staleTime: 10 * 60 * 1000, // 10 минут кеша
    });
};