import React from 'react';
import { StateProvider } from '../../common/StateProvider/StateProvider';
import ProjectByManagerPage from './ProjectByManagerPage';
const userInfor = JSON.parse(localStorage.getItem('USERINFOR'));

const ProjectPageContainer = () => {
  var idN = userInfor.id;
  console.log(idN);
  const initialState = {
    loading: false,
    pageNo: 0,
    pageSize: 15,
    searchParam: idN,
    searchType: 'BY_MANAGER_ID',
    sortBy: 'createdAt',
    sortTypeAsc: false,
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
      default:
        break;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ProjectByManagerPage />
    </StateProvider>
  );
};
export default ProjectPageContainer;
