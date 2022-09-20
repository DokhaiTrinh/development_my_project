import axios from 'axios';
import Swal from 'sweetalert2';

class AxiosService {
  constructor() {
    //axios bộ thư viện hỗ trợ call api
    const intance = axios.create();
    intance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.intance = intance;
  }

  handleSuccess(response) {
    return response;
  }
  // handleError(error) {
  //   if (error.response.status == 401) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: 'Thời gian đăng nhập hết hạn, vui lòng đăng nhập để được sử dụng lại',
  //       timer: 5000,
  //     });
  //     localStorage.clear();
  //     // window.location.href = '/';
  //   }
  //   return Promise.reject(error);
  // }
  get(url, token) {
    return this.intance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post(url, body, token) {
    return this.intance.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post2(url, body, token) {
    return this.intance.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }
  postSendMessage(url, body, token) {
    const formData = new FormData();
    // if (body) {
    //   for (let index = 0; index < body.file.length; index++) {
    //     formData.append('file', body.file[index]);
    //   }
    // }

    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  post3(url, body, token) {
    const formData = new FormData();
    const blueprintDTO = {
      projectId: body.projectId,
      designerName: body.desginerName,
      blueprintName: body.blueprintName,
      estimatedCost: body.estimatedCost,
    };
    const json = JSON.stringify(blueprintDTO);
    formData.append(
      'blueprintDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.file.length; index++) {
      formData.append('blueprintDoc', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateProject(url, body, token) {
    const formData = new FormData();
    const projectDTO = {
      planEndDate: body.planEndDate,
      planStartDate: body.planStartDate,
      location: body.location,
      ntvManagerIdList: body.ntvManagerIdList,
      userManagerIdList: body.userManagerIdList,
      estimatedCost: body.estimatedCost,
      projectName: body.projectName,
      workerIdList: body.workerIdList,
    };
    const json = JSON.stringify(projectDTO);
    formData.append(
      'projectDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('projectDocList', body.fileList[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateReport(url, body, token) {
    const formData = new FormData();
    const reportDTO = {
      projectId: body.projectId,
      reportDate: body.reportDate,
      reportDesc: body.reportDesc,
      reportDetailList: body.reportDetailList,
      reportTypeId: body.reportTypeId,
      reporterId: body.reporterId,
      reportName: body.reportName,
      taskReportList: body.taskReportList,
    };
    const json = JSON.stringify(reportDTO);
    formData.append(
      'reportDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('reportDocList', body.fileList[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateRequest(url, body, token) {
    const formData = new FormData();
    const requestDTO = {
      projectId: body.projectId,
      requestDate: body.requestDate,
      requestDesc: body.requestDesc,
      requestDetailList: body.requestDetailList,
      requestName: body.requestName,
      requestTypeId: body.requestTypeId,
      requesterId: body.requesterId,
    };
    const json = JSON.stringify(requestDTO);
    formData.append(
      'requestDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('requestDocList', body.fileList[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateTask(url, body, token) {
    const formData = new FormData();
    const taskDTO = {
      planEndDate: body.planEndDate,
      planStartDate: body.planStartDate,
      projectId: body.projectId,
      assigneeId: body.assigneeId,
      taskDesc: body.taskDesc,
      taskName: body.taskName,
    };
    const json = JSON.stringify(taskDTO);
    formData.append('taskDTO', new Blob([json], { type: 'application/json' }));
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('taskDocList', body.fileList[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateUser(url, body, token) {
    const formData = new FormData();
    const userDTO = {
      email: body.email,
      phone: body.phone,
      roleId: body.roleId,
      username: body.username,
      password: body.password,
      fullName: body.fullName,
      gender: body.gender,
      birthdate: body.birthdate,
    };
    const json = JSON.stringify(userDTO);
    formData.append('userDTO', new Blob([json], { type: 'application/json' }));
    for (let index = 0; index < body.file.length; index++) {
      formData.append('userAvatar', body.file[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreateWorker(url, body, token) {
    const formData = new FormData();
    const workerDTO = {
      address: body.address,
      citizenId: body.citizenId,
      fullName: body.fullName,
      socialSecurityCode: body.socialSecurityCode,
      gender: body.gender,
      birthday: body.birthday,
      birthPlace: body.birthPlace,
    };
    const json = JSON.stringify(workerDTO);
    formData.append(
      'workerDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.file.length; index++) {
      formData.append('workerAvatar', body.file[0]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  postCreatePost(url, body, token) {
    const formData = new FormData();
    const createPostModel = {
      address: body.address,
      authorName: body.authorName,
      ownerName: body.ownerName,
      postCategoryId: body.postCategoryId,
      postTitle: body.postTitle,
      scale: body.scale,
      estimatedCost: body.estimatedCost,
    };
    const json = JSON.stringify(createPostModel);
    formData.append(
      'createPostModel',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('postFileList', body.fileList[index]);
    }
    return this.intance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  put(url, body, token) {
    return this.intance.put(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  put2(url, body, token) {
    const formData = new FormData();

    for (let index = 0; index < body.length; index++) {
      formData.append('file', body[index]);
    }

    return this.intance.put(url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  put3(url, body, token) {
    const formData = new FormData();
    formData.append('file', body[0]);
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }
  putUpdateTask(url, body, token) {
    const formData = new FormData();
    const taskDTO = {
      actualEndDate: body.actualEndDate,
      actualStartDate: body.actualStartDate,
      planEndDate: body.planEndDate,
      planStartDate: body.planStartDate,
      projectId: body.projectId,
      // assigneeId: body.assigneeId,
      taskDesc: body.taskDesc,
      taskId: body.taskId,
      taskName: body.taskName,
    };
    const json = JSON.stringify(taskDTO);
    formData.append('taskDTO', new Blob([json], { type: 'application/json' }));
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('taskDocList', body.fileList[index]);
    }
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  putUpdateReport(url, body, token) {
    const formData = new FormData();
    const reportDTO = {
      projectId: body.projectId,
      reportDate: body.reportDate,
      reportDesc: body.reportDesc,
      reportId: body.reportId,
      reportName: body.reportName,
      reportTypeId: body.reportTypeId,
      reporterId: body.reporterId,
      reportDetailList: body.reportDetailList,
      taskReportList: body.taskReportList,
    };
    const json = JSON.stringify(reportDTO);
    formData.append(
      'reportDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('reportDocList', body.fileList[index]);
    }
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  putUpdateRequest(url, body, token) {
    const formData = new FormData();
    const requestDTO = {
      requestId: body.requestId,
      projectId: body.projectId,
      requestDate: body.requestDate,
      requestName: body.requestName,
      requestDesc: body.requestDesc,
      requestDetailList: body.requestDetailList,
      requestTypeId: body.requestTypeId,
      requesterId: body.requesterId,
    };
    const json = JSON.stringify(requestDTO);
    formData.append(
      'requestDTO',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('requestDocList', body.fileList[index]);
    }
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  putUpdatePost(url, body, token) {
    const formData = new FormData();
    const updatePostModel = {
      postId: body.postId,
      address: body.address,
      authorName: body.authorName,
      ownerName: body.ownerName,
      postCategoryId: body.postCategoryId,
      postTitle: body.postTitle,
      estimatedCost: body.estimatedCost,
      scale: body.scale,
    };
    const json = JSON.stringify(updatePostModel);
    formData.append(
      'updatePostModel',
      new Blob([json], { type: 'application/json' })
    );
    for (let index = 0; index < body.fileList.length; index++) {
      formData.append('postFileList', body.fileList[index]);
    }
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  putUpdateUser(url, body, token) {
    const formData = new FormData();
    const userDTO = {
      userId: body.userId,
      username: body.username,
      roleId: body.roleId,
      email: body.email,
      phone: body.phone,
      fullName: body.fullName,
      gender: body.gender,
      birthdate: body.birthdate,
    };
    const json = JSON.stringify(userDTO);
    formData.append('userDTO', new Blob([json], { type: 'application/json' }));
    for (let index = 0; index < body.file.length; index++) {
      formData.append('userAvatar', body.file[index]);
    }
    return this.intance.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  delete(url, token) {
    return this.intance.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AxiosService();
