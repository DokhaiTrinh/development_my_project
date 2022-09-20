import React from 'react';
import { StateProvider } from '../../common/StateProvider/StateProvider';
import ProjectDetailsPage from './ProjectDetailsPage';
import { useParams } from 'react-router-dom';
const ProjectDetailPageContainer = () => {
  const { id } = useParams();
  const initialState = {
    loading: false,
    searchParam: id,
    searchType: 'REPORT_BY_PROJECT_ID',  
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
      <ProjectDetailsPage />
    </StateProvider>
  );
};
export default ProjectDetailPageContainer;
