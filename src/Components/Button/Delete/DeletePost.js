import React from 'react'
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import { deletePostApi } from '../../../apis/Post/deletePost';

export const DeletePost = (postId) => {
    const [{ loading }, dispatch] = useStateValue();
    const handleDeletePost = (id) => {
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
            deletePost(id);
          }
        });
      };
      const deletePost = async (id) => {
        try {
          await deletePostApi(id);
          await Swal.fire(
            'Xóa thành công!',
            'Bài đăng của bạn đã được xóa thành công.',
            'success'
          );
          dispatch({ type: 'LOADING', newLoading: !loading });
        } catch (error) { }
      };
    return (
        <IconButtonCus onClick={() => handleDeletePost(postId)} icon={
            <DeleteIcon />
        } />
        // <DeleteButton onClick={() => handleDeletePost(postId)}/>
    )
}

export default DeletePost