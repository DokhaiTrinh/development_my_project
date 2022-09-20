import React from 'react';
import { StateProvider } from '../../common/StateProvider/StateProvider';
import ProjectDetailsPage from './ProjectDetailsPage';
import { useParams } from 'react-router-dom';
const ProjectDetailPageContainer = () => {
  const { id } = useParams();
  const initialState = {
    loading: false,
    pageNo: 0,
    pageSize: 15,
    projectId: id,
    sortBy: 'createdAt',
    sortTypeAsc: false,
    searchType: 'BY_PROJECT_ID',
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.newLoading,
        };
      case 'CHANGE_PAGENO':
        return {
          ...state,
          pageNo: action.newPageNo,
        };
      case 'CHANGE_PAGESIZE':
        return {
          ...state,
          pageSize: action.newPageSize,
        };
      case 'CHANGE_SORTBY':
        return {
          ...state,
          sortBy: action.newSortBy,
        };
      case 'CHANGE_SORTTYPEASC':
        return {
          ...state,
          sortTypeAsc: action.newSortTypeAsc,
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
