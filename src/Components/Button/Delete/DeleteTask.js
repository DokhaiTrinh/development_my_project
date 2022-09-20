import React from 'react';
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { deleteTaskApi } from '../../../apis/Task/deleteTask';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

export const DeleteTask = (taskId) => {
    const [{ loading }, dispatch] = useStateValue();

    const handleDeleteTask = (id) => {
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
            DeleteTask(id);
          }
        });
      };
      const DeleteTask = async (id) => {
        try {
          await deleteTaskApi(id);
          await Swal.fire(
            'Xóa thành công!',
            'Công việc của bạn đã được xóa thành công.',
            'success'
          );
          dispatch({ type: 'LOADING', newLoading: !loading });
        } catch (error) {}
      };
    return (
        <IconButtonCus onClick={() => handleDeleteTask(taskId)} icon={
            <DeleteIcon />
        } />
    )
}

export default DeleteTask