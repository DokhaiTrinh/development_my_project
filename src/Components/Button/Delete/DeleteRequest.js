import React from 'react'
import { deleteRequestApi } from '../../../apis/Request/deleteRequest';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import Swal from 'sweetalert2';
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteRequest = (reqId) => {
    const [{ loading }, dispatch] = useStateValue();
    const handleDeleteRequest = (id) => {
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
            DeleteRequest(id);
          }
        });
      };
      const DeleteRequest = async (id) => {
        try {
          await deleteRequestApi(id);
          await Swal.fire(
            'Xóa thành công!',
            'Dự án của bạn đã được xóa thành công.',
            'success'
          );
          dispatch({ type: 'LOADING', newLoading: !loading });
        } catch (error) { }
      };
    return (
        <IconButtonCus onClick={() => handleDeleteRequest(reqId)} icon={
            <DeleteIcon/>
        } />
    )
}

export default DeleteRequest