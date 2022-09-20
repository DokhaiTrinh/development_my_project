import React from 'react'
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { deleteUserkApi } from '../../../apis/User/deleteUser';
import { useStateValue } from '../../../common/StateProvider/StateProvider';

export const DeleteUser = (userId) => {
    const [{ loading }, dispatch] = useStateValue();
    const handleDeleteUser = (id) => {
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
                deleteUser(id);
            }
        });
    };
    const deleteUser = async (id) => {
        try {
            await deleteUserkApi(id);
            await Swal.fire(
                'Xóa thành công!',
                'Nhân viên của bạn đã được xóa thành công.',
                'success'
            );
            dispatch({ type: 'LOADING', newLoading: !loading });
        } catch (error) { }
    };
    return (
        <IconButtonCus onClick={() => handleDeleteUser(userId)} icon={
            <DeleteIcon />
        } />
        // <DeleteButton onClick={() => handleDeleteUser(userId)}/>
    )
}

export default DeleteUser