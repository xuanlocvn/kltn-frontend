import React, { useRef, useEffect } from "react"
import { CustomWindow } from "src/utils/window"
import PropTypes from "prop-types"

declare let window: CustomWindow

Paypal.propTypes = {
  value: PropTypes.string,
  message: PropTypes.string,
  callback: PropTypes.func,
}

export default function Paypal(props) {
  const { value, message, callback } = props
  const paypal = useRef()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: message,
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          console.log(order)
          callback()
        },
        onError: (err) => {
          console.log(err)
        },
      })
      .render(paypal.current)
  }, [])

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}
