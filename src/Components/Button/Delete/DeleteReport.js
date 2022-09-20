import React from 'react';
import { deleteReportApi } from '../../../apis/Report/deleteReport';
import Swal from 'sweetalert2';
import { useStateValue } from '../../../common/StateProvider/StateProvider';
import IconButtonCus from '../IconButtonCus';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteReport = (reportId) => {
  const [{ loading }, dispatch] = useStateValue();
  const handleDeleteReport = (id) => {
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
        DeleteReport(id);
      }
    });
  };
  const DeleteReport = async (id) => {
    try {
      await deleteReportApi(id);
      await Swal.fire(
        'Xóa thành công!',
        'Dự án của bạn đã được xóa thành công.',
        'success'
      );
      dispatch({ type: 'LOADING', newLoading: !loading });
    } catch (error) {}
  };

  return (
    <IconButtonCus
      onClick={() => handleDeleteReport(reportId)}
      icon={<DeleteIcon />}
    />
  );
};

export default DeleteReport;
