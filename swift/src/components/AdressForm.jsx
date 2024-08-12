import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import { UserOutlined, PhoneOutlined, EnvironmentOutlined, SyncOutlined } from "@ant-design/icons";
import Cart from "./Cart";
import Lottie from "react-lottie";
import addressLottie from "../assets/adress.json";
import adressFind from "../assets/adressfind.json";
import orderPlacedLottie from "../assets/ordersuccessScooter.json";
import successLottie from "../assets/orderSuccess.json";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [cart, setCart] = useState(false);
  const [form] = Form.useForm();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: '',
    error: '',
    accuracy: null,
  });
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [success, setSuccess] = useState(false);
  const toastShownRef = useRef(false);
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addressLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: adressFind,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOrderPlacedOptions = {
    loop: false,
    autoplay: true,
    animationData: orderPlacedLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultSuccessOptions = {
    loop: false,
    autoplay: true,
    animationData: successLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setLocation((prevState) => ({
            ...prevState,
            latitude,
            longitude,
            accuracy,
          }));

          if (accuracy <= 500) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
              .then((response) => response.json())
              .then((data) => {
                const fetchedAddress = data.display_name || "Address not found";
                setLocation((prevState) => ({
                  ...prevState,
                  address: fetchedAddress,
                  pincode: data.address.postcode,
                }));
                form.setFieldsValue({ address: fetchedAddress });
                form.setFieldsValue({ pincode: data.address.postcode });
                setIsEditable(true);
              })
              .catch((error) => {
                setLocation((prevState) => ({
                  ...prevState,
                  error: "Error fetching address",
                }));
                setIsEditable(true);
              })
              .finally(() => setLoading(false));
          } else {
            if (!toastShownRef.current) {
              toast.error("Sorry! Add Address Manually");
              toastShownRef.current = true;
            }
            setIsEditable(true);
            setLoading(false);
          }
        },
        (error) => {
          setLocation((prevState) => ({
            ...prevState,
            error: "Error getting location: " + error.message,
          }));
          if (!toastShownRef.current) {
            toast.error("Error getting location: " + error.message);
            toastShownRef.current = true;
          }
          setIsEditable(true);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by this browser.",
      }));
      if (!toastShownRef.current) {
        toast.error("Geolocation is not supported by this browser.");
        toastShownRef.current = true;
      }
      setIsEditable(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCart(true);
  };

  const orderSubmit = () => {
    setOrderPlaced(true); 
    setTimeout(() => {
      setOrderPlaced(false);
      setSuccess(true); 
      setTimeout(() => {
        navigate("/"); 
      }, 3000);
    }, 3000);
  };

  return (
    <>
     {orderPlaced && (
  <div className="bg-gradient-to-br from-white/70 to-white/30 bg-opacity-90 h-screen backdrop-blur-3xl shadow-2xl rounded-2xl flex items-center justify-center">
    <Lottie options={defaultOrderPlacedOptions} height={500} width={400}/>
  </div>
)}
{success && (
  <div className="bg-gradient-to-br from-black/70 to-gray-800/30 bg-opacity-90 h-screen backdrop-blur-3xl shadow-2xl rounded-2xl flex items-center justify-center">
    <Lottie options={defaultSuccessOptions} height={500} width={400}/>
  </div>
)}

      {!orderPlaced && !success && (
        <>
          <Toaster />
          {isModalVisible && (
            <Modal
              open={isModalVisible}
              onOk={handleOk}
              footer={null}
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical" name="address_form">
                <Form.Item>
                  <div className="flex flex-col items-center justify-center">
                    {loading ? (
                      <Lottie options={defaultOptions2} height={250} width={200} />
                    ) : (
                      <Lottie options={defaultOptions} height={80} width={100} />
                    )}
                    <h1 className="text-center font-semibold text-orange-500">
                      {loading ? "Finding Address..." : "Provide Address"}
                    </h1>
                  </div>
                </Form.Item>
                {!loading && (
                  <>
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Please input your name!" }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      rules={[{ required: true, message: "Please input your phone number!" }]}
                    >
                      <Input
                        prefix={<PhoneOutlined />}
                        style={{ width: "100%" }}
                        placeholder="Phone Number"
                      />
                    </Form.Item>
                    <Form.Item
                      name="pincode"
                      rules={[{ required: true, message: "Please input your pincode!" }]}
                    >
                      <Input
                        prefix={<EnvironmentOutlined />}
                        placeholder="Pincode"
                      />
                    </Form.Item>
                    <Form.Item
                      name="address"
                      rules={[{ required: true, message: "Please input your address!" }]}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input.TextArea
                          placeholder="Address"
                          style={{ flex: 1 }}
                          value={location.address}
                          onChange={(e) =>
                            setLocation((prevState) => ({
                              ...prevState,
                              address: e.target.value,
                            }))
                          }
                          disabled={!isEditable}
                        />
                        <SyncOutlined
                          style={{ fontSize: "24px", color: "#1890ff", marginLeft: "8px", cursor: "pointer" }}
                          onClick={fetchLocation}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox value="Check" className="border-orange-500">
                        Cash on Delivery
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <button onClick={orderSubmit} className="float-right p-2 bg-green-700 text-white font-bold rounded-md">Place Order</button>
                    </Form.Item>
                  </>
                )}
              </Form>
            </Modal>
          )}
        </>
      )}
      
      {!isModalVisible && cart && <Cart />}
    </>
  );
};

export default OrderForm;
