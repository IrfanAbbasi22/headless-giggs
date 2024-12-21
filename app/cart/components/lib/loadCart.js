'use client';
import { useDispatch } from 'react-redux';
import { loadCartFromWoo, setInitCountries } from '../../store/slices/cartSlice';
import {fetchWooCommerceCart} from '../../../components/lib/cart/fetchAndSyncCart';
import { getCountries } from '@/app/components/lib/cart/getCountries';
 
const LoadCart = () => {
    const dispatch = useDispatch();

    getCountries().then((data) => {
        if(data){
            dispatch(setInitCountries(data));
        }
    });
    
    fetchWooCommerceCart().then((data) => {
        if (data) {
            // console.log('data', data);
            dispatch(loadCartFromWoo(data));
        }
    });

    return null; // No UI is needed
};

export default LoadCart;
