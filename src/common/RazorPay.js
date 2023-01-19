import config from "./config";


const OpenRazorPay = ({ orderDetail, cb, userDetails, Razorpay }) => {
  if (!orderDetail?.amount || !orderDetail?.id) {
    cb && cb({ msg: "Order Amount Not Available", code: "0000" }, null);
    return
  }
  if (!orderDetail?.id) {
    cb && cb({ msg: "OrderId Not Available", code: "0000" }, null);
    return
  }

  const options = {
    key: config.RAZOR_KEY_ID, // Enter the Key ID generated from the Dashboard
    amount: orderDetail.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Solorder",
    description: orderDetail?.description || "",
    image: "https://res.cloudinary.com/dxqrlh22r/image/upload/v1673081798/solorder_rmaybx.ico",
    order_id: orderDetail.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) {
      cb && cb(null, response)
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: userDetails?.name || "",
      email: userDetails?.email || "",
      contact: "",
    },
    theme: {
      color: "#FFFFFF",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    cb && cb({ msg: response.error.reason, code: response.error.code }, null);
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
  });

  rzp1.open();
};

export default OpenRazorPay;