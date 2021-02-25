import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapActions } from '../store';

const { cleanTransition } = mapActions;

export default function useCleanMap() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(cleanTransition());
  });
}
