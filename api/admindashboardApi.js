import axios from "axios";
import Swal from "sweetalert2";

let savedData = localStorage.getItem("savedData");
if (savedData != null) {
  savedData = savedData.split(",");
}

const baseUrl = process.env.REACT_APP_BASE_URL;
const API_BASE_URL_SUPLEMENTARY = baseUrl + "/Admin/SupplementaryResource";

const API_BASE_URL_ActiveStudentCount =
  baseUrl + "/Admin/AdminDashboard/ActiveStudentCount";
const API_BASE_URL_ActiveTrainerCount =
  baseUrl + "/Admin/AdminDashboard/ActiveTrainerCount";
const API_BASE_URL_ActiveAdminCount =
  baseUrl + "/Admin/AdminDashboard/ActiveAdminCount";
const API_BASE_URL_ActiveClassroomCount =
  baseUrl + "/Admin/AdminDashboard/GetActiveClassroomCount";
const API_BASE_URL_GetClassroomPercentageByGroupTypeName =
  baseUrl + "/Admin/AdminDashboard/GetClassroomPercentageByGroupTypeName";
const API_BASE_URL_GetAllActiveClassroomCountGroupedByEducation =
  baseUrl +
  "/Admin/AdminDashboard/GetAllActiveClassroomCountGroupedByEducation";
const API_BASE_URL_GetAllActiveStudentCountGroupedByEducation =
  baseUrl + "/Admin/AdminDashboard/GetAllActiveStudentCountGroupedByEducation";
const API_BASE_URL_GetStudentsCountsMonthlyByBranches =
  baseUrl + "/Admin/AdminDashboard/GetStudentsCountsMonthlyByBranches";
const API_BASE_URL_GetStudentsCountByBranchesandCreatedDatesMonthly =
  baseUrl +
  "/Admin/AdminDashboard/GetStudentsCountByBranchesandCreatedDatesMonthly";
const API_BASE_URL_GetPendingApprovalSupplementaryResources =
  baseUrl + "/Admin/AdminDashboard/GetPendingApprovalSupplementaryResources";
const API_BASE_URL_GetTotalStorage =
  baseUrl + "/Admin/AdminDashboard/GetTotalStorageDashboard";

class RedirectError extends Error {
  constructor() {
    super("RedirectError");
    this.name = "RedirectError";
  }
}

//Aktif Öğrenci Sayısını Getirme
export async function getActiveStudentCount() {
  try {
    const response = await axios.get(`${API_BASE_URL_ActiveStudentCount}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedData[0]}`,
      },
    });
    return response.data.data.activeStudentCount;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title || "Aktif öğrenci sayısı getirilemedi."
    );
  }
}

//Aktif Eğitmen Sayısını Getirme
export async function getActiveTrainerCount() {
  try {
    const response = await axios.get(`${API_BASE_URL_ActiveTrainerCount}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedData[0]}`,
      },
    });
    return response.data.data.activeTrainersCount;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title || "Aktif eğitmen sayısı getirilemedi."
    );
  }
}

//Aktif Admin Sayısını Getirme
export async function getActiveAdminCount() {
  try {
    const response = await axios.get(`${API_BASE_URL_ActiveAdminCount}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedData[0]}`,
      },
    });
    return response.data.data.activeAdminsCount;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title || "Aktif admin sayısı getirilemedi."
    );
  }
}

//Aktif Sınıf Sayısını Getirme
export async function getActiveClassroomCount() {
  try {
    const response = await axios.get(`${API_BASE_URL_ActiveClassroomCount}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedData[0]}`,
      },
    });
    return response.data.data.activeClassroomCount;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title || "Aktif sınıf sayısı getirilemedi."
    );
  }
}

//Aylar Bazında Şubelere Öğrenci Dağılımı Sayıları Getirme (Şu an dashboardda kullanılmıyor)
export async function getStudentsCountsMonthlyByBranches() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetStudentsCountsMonthlyByBranches}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Şubelere Öğrenci Dağılımı Sayıları getirilemedi."
    );
  }
}

//Aylar Bazında Şubelere Göre Öğrenci Sayıları Student tablosundan (Güncel Combochart bağlantısı)
export async function getStudentsCountByBranchesandCreatedDatesMonthly() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetStudentsCountByBranchesandCreatedDatesMonthly}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Şubelere Öğrenci Dağılımı Sayıları getirilemedi."
    );
  }
}

//Pasta Grafiği İçin Sınıf Yüzdesini Getirme
export async function getClassroomPercentageByGroupType() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetClassroomPercentageByGroupTypeName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title || "Sınıf yüzdesi getirilemedi."
    );
  }
}

//Eğitimlere Göre Sınıf Sayılarını Getirme
export async function getAllActiveClassroomCountGroupedByEducation() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetAllActiveClassroomCountGroupedByEducation}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Eğitime Bağlı Sınıf Sayıları getirilemedi."
    );
  }
}

//Eğitimlere Göre Öğrenci Sayılarını Getirme
export async function getAllActiveStudentCountGroupedByEducation() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetAllActiveStudentCountGroupedByEducation}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Eğitime Bağlı Öğrenci Sayıları getirilemedi."
    );
  }
}

//Onay Bekleyen Kaynaklar Tablosu Verilerini Getirme
export async function getPendingApprovalSupplementaryResources() {
  try {
    const response = await axios.get(
      `${API_BASE_URL_GetPendingApprovalSupplementaryResources}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Onay Bekleyen Kaynaklar Verisi getirilemedi."
    );
  }
}

// kaynağın resourcetypestatus unu güncelleme
export async function updateResourcesTypeStatus(id, status) {
  try {
    const response = await axios.put(
      `${API_BASE_URL_SUPLEMENTARY}/UpdateStatus?supplementaryResourceId=${id}&status=${status}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage 200 ve 400 hariç
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    // Axios ile gelen hatayı işle
    const errorMessage = error.response?.data?.message || "Bir hata oluştu. ";
    console.error(errorMessage);

    // Swal.fire() backend tarafından gelen hata mesajını göster
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });

    throw error;
  }
}

//Geri bildirim ekleme
export async function giveFeedback(formdata) {
  try {
    const response = await axios.put(
      `${API_BASE_URL_SUPLEMENTARY}/GiveFeedback`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedData[0]}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage 200 ve 400 hariç
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.message || "Geri bildirim eklenemedi"
    );
  }
}

//Toplam depolama alanını getirme
export async function getTotalStorage() {
  try {
    const response = await axios.get(`${API_BASE_URL_GetTotalStorage}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedData[0]}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      throw new RedirectError();
    }
    if (error.response) {
      const status = error.response.status;
      // Redirect to ErrorPage for statuses other than 200, 201, ..., and 500
      if (
        status !== 200 &&
        status !== 201 &&
        status !== 202 &&
        status !== 203 &&
        status !== 204 &&
        status !== 205 &&
        status !== 206 &&
        status !== 207 &&
        status !== 210 &&
        status !== 400
      ) {
        throw new RedirectError();
      }
    }
    throw new Error(
      error.response?.data?.title ||
        "Onay Bekleyen Kaynaklar Verisi getirilemedi."
    );
  }
}
