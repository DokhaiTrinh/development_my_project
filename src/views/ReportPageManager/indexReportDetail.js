import React from 'react';
import { StateProvider } from '../../common/StateProvider/StateProvider';
import ReportDetailsPage from './ReportDetailPage';
import { useParams } from 'react-router-dom';
const ReportDetailPageContainer = () => {
  const { id } = useParams();
  const initialState = {
    loading: false,
    searchParam: id,
    searchType: 'BY_ID',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.newLoading,
        };
      case 'CHANGE_SEARCHPARAM':
        return {
          ...state,
          searchParam: action.searchParam,
        };
      case 'CHANGE_SEARCHTYPE':
        return {
          ...state,
          searchType: action.searchType,
        };
      default:
        break;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ReportDetailsPage />
    </StateProvider>
  );
};
export default ReportDetailPageContainer;
