import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, notification, Space } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getErrorMessage } from "../../utils/errorMessage";
import { API_URL, STORAGE_KEY } from "../../constants";

const status = {
  0: "Verifying",
  1: "Approved",
  2: "Rejected",
};

const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (a) => a ?? "-",
  },
  {
    title: "Venue Name",
    dataIndex: "venueName",
    key: "venueName",
    render: (a) => a ?? "-",
  },
  {
    title: "Academy Name",
    dataIndex: "academyName",
    key: "academyName",
    render: (a) => a ?? "-",
  },
  {
    title: "Sports Detail",
    dataIndex: "sportsDetail",
    key: "sportsDetail",
    render: (a) => a ?? "-",
  },
  {
    title: "Sport Specification",
    dataIndex: "sportsSpecification",
    key: "sportSpecification",
    render: (a) => a ?? "-",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (a) => a ?? "-",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    render: (a) => a ?? "-",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (a) => a ?? "-",
  },
  {
    title: "Website / Portofolio",
    dataIndex: "website",
    key: "website",
    render: (a) => a ?? "-",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (a) => status[a],
  },
];

const Partners = () => {
  const { getItem } = useLocalStorage();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = () => {
    axios
      .get(API_URL.partners, {
        headers: {
          Authorization: getItem(STORAGE_KEY.token),
        },
      })
      .then(({ data }) => {
        setList(data.data);
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: getErrorMessage(err),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const updateStatus = (type, row) => {
    setLoading(true);
    axios
      .put(
        `${API_URL.partners}/${row.id}`,
        {
          status: type === "approve" ? 1 : 2,
        },
        {
          headers: { Authorization: getItem(STORAGE_KEY.token) },
        }
      )
      .then(() => {
        fetchPartners();
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: getErrorMessage(err),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePartner = (row) => {
    setLoading(true);
    axios
      .delete(`${API_URL.partners}/${row.id}`, {
        headers: { Authorization: getItem(STORAGE_KEY.token) },
      })
      .then(() => {
        fetchPartners();
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: getErrorMessage(err),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generateColumns = () => {
    return [
      ...columns,
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (_, row) => (
          <Space>
            {row.status === 0 && (
              <>
                <Button
                  style={{ borderColor: "#1890ff", color: "#1890ff" }}
                  onClick={() => updateStatus("approve", row)}
                  disabled={loading}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => updateStatus("reject", row)}
                  disabled={loading}
                  danger
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              onClick={() => deletePartner(row)}
              disabled={loading}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
  };

  return (
    <Table
      columns={generateColumns()}
      dataSource={list}
      loading={loading}
      scroll={{ x: 1400 }}
    />
  );
};

export default Partners;
