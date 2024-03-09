import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Card,
  Row,
  Col,
  Result,
  Button,
  Tooltip,
  Table,
  Dropdown,
  Menu,
  Popconfirm,
  Space,
  TableProps,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, fetchProduct, fetchProducts, updateProduct } from "./productSlice";
import { ProductType } from "./types";
import moment from "moment";
import CustomModal from "../../components/Modal";
import ProductDetail from "./components/productDetail";
import FormComponent from "./components/formComponent";

export default function List() {
  const [open, setOpen] = useState({
    open: false,
    content: "",
  });
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.list);
  console.log("from products list",products);
  
  const product = useAppSelector((state) => state.product.selected);
  console.log("from product list",product)

  // const product = useAppSelector((state) => state.product.selected);
  const navigate = useNavigate();

  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId === undefined) return;
    dispatch(fetchProducts(categoryId));
  }, [dispatch]);


  const onDetailsHandle = useCallback((e: boolean, id?: string) => {
    setOpen({
      open: e,
      content: "details",
    });
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch]);
  
  const onEditHandle = useCallback((e: boolean, id?: string) => {
    setOpen({
      open: e,
      content: "edit",
    });
    if (id) {
      dispatch(fetchProduct(id));
       console.log(id,'okjhtrewasdfgyofvtrd');
      
    }
    
  }, [dispatch]);

  const onDeleteHandle = useCallback((e: any, id?: string) => {
    dispatch(deleteProduct(e));
  }, [dispatch]);


  const onFinish = (values: any) => {
    console.log( "vakyes from list tsx", values);
    dispatch(updateProduct(values));
    setOpen({ open: false, content: "" });
    
   
  };

  const onNavigate = () => navigate("/products/create");

  type ColumnType = TableProps<ProductType>["columns"] | any;
  const columns: ColumnType = useMemo(
    () => [
      {
        title: "Product Name",
        dataIndex: "productName",
        key: `productName`,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: `description`,
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: `unitPrice`,
      },
      {
        title: "Units In Stock",
        dataIndex: "unitsInStock",
        key: `unitsInStock`,
      },
      {
        title: "Category",
        dataIndex: "categoryName",
        key: `categoryName`,
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: `createdDate`,
        render: (_: any) => {
          return <> {moment(_).format("YYYY-MM-DD HH:mm:ss")} </>;
        },
      },
      {
        title: "Actions",
        key: `actions`,
        dataIndex: "_id",
        render: (_: any) => {
          return (
            <Dropdown
              trigger={["click"]}
              dropdownRender={(menu) => (
                <div>
                  <Menu>
                    <Menu.Item
                      key={`edit_${_}`}
                      onClick={() => onEditHandle(true, _)}
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      key={`details_${_}`}
                      onClick={() => onDetailsHandle(true, _)}
                      icon={<SearchOutlined />}
                    >
                      Details
                    </Menu.Item>
                    <Menu.Item
                      key={`delete_${_}`}
                      icon={<DeleteOutlined />}
                      danger
                    >
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDeleteHandle(_)}
                      >
                        Delete
                      </Popconfirm>
                    </Menu.Item>
                  </Menu>
                </div>
              )}
            >
              <Button size={"middle"}>
                <Space>
                  <SettingOutlined />
                </Space>
              </Button>
            </Dropdown>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Card>
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 0, offset: 0 }}
          >
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Pervin Nerdesin?</Button>}
            />
          </Col>
          <Col
            xs={{ span: 0, offset: 0 }}
            sm={{ span: 0, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
            style={{ marginBottom: 16 }}
          >
            <Tooltip title="Create">
              <Button
                onClick={onNavigate}
                style={{ float: "right" }}
                type="primary"
                icon={<PlusOutlined />}
              >
                Yeni Prodakt
              </Button>
            </Tooltip>
          </Col>
          <Col span={24}>
            <Table
              size="middle"
              locale={{
                emptyText: "Data Yok :(",
                filterSearchPlaceholder: "Ara",
              }}
              columns={columns}
              dataSource={products}
            />
          </Col>
        </Row>
      </Card>
      {open.content === "details" ? (
        <CustomModal
          title={`Product Details`}
          width={1200}
          open={open.open}
          onOpenHandler={onDetailsHandle}
          content={<ProductDetail product={product} />}
        />
      ) : (
        <CustomModal
          title={`Product Edit`}
          width={700}
          open={open.open}
          onOpenHandler={onEditHandle}
          content={
            <FormComponent onFinish={onFinish} initialValues={products} />
          }
        />
      )}
    </>
  );
}
