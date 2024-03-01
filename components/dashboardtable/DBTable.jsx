import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./dbtable.scss";
import {
  FaFileVideo,
  FaLink,
  FaFileAlt,
  FaGlobe,
  FaEllipsisH,
} from "react-icons/fa";
import Dashboardavatar from "./Dashboardavatar";
import {
  getPendingApprovalSupplementaryResources,
  updateResourcesTypeStatus,
  giveFeedback,
} from "../../api/admindashboardApi";
import Dropdown from "../../../../../shared/buttons/drop-downs/DropDown";
import Swal from "sweetalert2";
import { ChangeFeedback } from "../../../../../shared/feedback/Feedback";

const DBTable = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const dropdownRefs = useRef([]);

  const fetchData = async () => {
    try {
      const resourcesData = await getPendingApprovalSupplementaryResources();
      setResources(resourcesData);
    } catch (error) {
      console.error("Kaynaklar yüklenirken bir hata oluştu", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (resourceId) => {
    navigate(
      `./supplementaryresource/supplementaryresourcedetail/${resourceId}`
    );
  };

  const handleDropdownAction = (action, resourceId) => {
    switch (action) {
      case "Onayla":
        return handleConfirmResource(resourceId);

      case "Reddet":
        return handleRejectResource(resourceId);

      default:
        return null;
    }
  };

  const handleRejectResource = async (supplementaryResourceId) => {
    const isSuccess = await ChangeFeedback(
      supplementaryResourceId,
      giveFeedback
    );
    if (isSuccess) {
      setResources(
        resources.filter(
          (resource) => resource.resourceId !== supplementaryResourceId
        )
      );
    }
  };

  const handleConfirmResource = (id) => {
    Swal.fire({
      title: "Onaylandı",
      text: "Kaynak Başarıyla Onaylandı",
      icon: "success",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const isSuccess = await updateResourcesTypeStatus(id, 1);
        if (isSuccess) {
          setResources(
            resources.filter((resource) => resource.resourceId !== id)
          );
        }
      }
    });
  };

  const getResourceIcon = (resourceType) => {
    const iconStyle = {
      fontSize: "1.5rem",
      verticaAlign: "middle",
      marginRight: "10px",
    };
    switch (resourceType) {
      case "Video":
        return <FaFileVideo style={{ ...iconStyle, color: "blue" }} />;
      case "Link":
        return <FaLink style={{ ...iconStyle, color: "orange" }} />;
      case "Document":
        return <FaFileAlt style={{ ...iconStyle, color: "green" }} />;
      default:
        return <FaGlobe style={{ ...iconStyle, color: "grey" }} />;
    }
  };

  return (
    <div>
      <hr className="mt-2" />
      <div className="table-responsive">
        <table className="table align-middle table-nowrap table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Kaynak Adı</th>
              <th scope="col">Eklenme Zamanı</th>
              <th scope="col">Boyut</th>
              <th scope="col">Ekleyen</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => {
              const nameParts = resource.resourceCreatedByName
                ? resource.resourceCreatedByName.split(" ")
                : [];
              const firstName = nameParts.length > 0 ? nameParts[0] : null;
              const lastName =
                nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

              const sizeStyle =
                resource.resourceType === "Link" ? { marginLeft: "-10px" } : {};

              return (
                <tr key={index}>
                  <td
                    onClick={() => handleNavigation(resource.resourceId)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fw-medium">
                      {getResourceIcon(resource.resourceType)}
                      {resource.resourceName}
                    </span>
                  </td>
                  <td>
                    <span className="dbtable-date">
                      {resource.resourceCreatedDate}
                    </span>
                  </td>
                  <td>
                    <span className="dbtable-size" style={sizeStyle}>
                      {resource.resourceType === "Link"
                        ? "Boyut Yok"
                        : ` ${resource.resourceFileSize} KB`}
                    </span>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <div className="avatar-group">
                      <div className="avatar-group-item">
                        {resource.resourceCreatedByName ? (
                          <Dashboardavatar
                            firstName={firstName}
                            lastName={lastName}
                          />
                        ) : (
                          <Dashboardavatar firstName={null} lastName={null} />
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <div
                      className="dbtable-dropdown"
                      ref={(el) => (dropdownRefs.current[index] = el)}
                    >
                      <div className="dbtable-dropdowncontent">
                        <Dropdown
                          userIndex={index}
                          triggerText={
                            <span>
                              <FaEllipsisH />
                            </span>
                          }
                          options={["Onayla", "Reddet"]}
                          onOptionClick={(option) =>
                            handleDropdownAction(option, resource.resourceId)
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DBTable;
