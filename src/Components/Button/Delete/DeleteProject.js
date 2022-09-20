import React from 'react'
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { deleteProjectApi } from '../../../apis/Project/deleteProject';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

export const DeleteProject = (projetId) => {
    const [{ loading }, dispatch] = useStateValue();
    const handleDeleteProject = (id) => {
        Swal.fire({
          title: 'Bạn có chắc chứ?',
          text: 'Bạn không thể thu hổi lại khi ấn nút!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Có, hãy xóa nó!',
        }).then((result) => {
          if (result.isConfirmed) {
            DeleteProject(id);
          }
        });
      };
    
      const DeleteProject = async (id) => {
        try {
          await deleteProjectApi(id);
          await Swal.fire(
            'Xóa thành công!',
            'Dự án của bạn đã được xóa thành công.',
            'success'
          );
          dispatch({ type: 'LOADING', newLoading: !loading });
        } catch (error) { }
      };
    return (
        <IconButtonCus onClick={() => handleDeleteProject(projetId)} icon={
            <DeleteIcon />
        } />
    )
}

export default DeleteProject