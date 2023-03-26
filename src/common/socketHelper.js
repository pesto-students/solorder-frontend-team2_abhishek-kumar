import React, { useEffect, useRef } from 'react'
import io from "socket.io-client";
import signInUpStore from '../zustang/auth/signInUpStore';
import commonStore from '../zustang/common/commonStore';
import dashboardStore from '../zustang/restaurant/dashboardStore';
import config from './config';

var timerSet = null
const SocketHelper = () => {
  const { userData } = signInUpStore(state => state)
  const { getActiveOrders } = dashboardStore(s => s)
  var { notify, isLoader } = commonStore(s => s)
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io(config.NODE_ENV === "production" ? String(config.PROD_BE_URL) : String(config.LOCAL_BE_URL));
    if (userData?.role_id && (userData.role_id === 1) && userData?.user_id && socketRef.current) {
      socketRef.current.emit("join_user", userData.user_id)
    } else if (userData?.role_id && (userData.role_id === 2) && userData?.restaurant_id && socketRef.current) {
      socketRef.current.emit("join_restaurant", userData.restaurant_id)
    }
    if (socketRef.current) {
      socketRef.current.on("refreshActiveOrder", () => {
        if (timerSet)
          clearTimeout(timerSet);
        timerSet = setTimeout(() => {
          getActiveOrders({
            cb: (res) => {
              if (res.error)
                notify(res.msg, "error")
            }
          })
        }, 1000)
      })
    }
    return () => {
      socketRef.current.disconnect();
    }
  }, [])

  return (
    <></>
  )
}

export default SocketHelper