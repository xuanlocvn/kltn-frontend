import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

PaypalComponent.propTypes = {
  currency: PropTypes.string,
  showSpinner: PropTypes.bool,
  amount: PropTypes.string,
}

function PaypalComponent(props) {
  const { currency, showSpinner, amount } = props
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    })
  }, [currency, showSpinner])

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "horizontal", tagline: false, color: "silver" }}
        disabled={false}
        forceReRender={[amount, currency, { layout: "horizontal" }]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId
            })
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          })
        }}
      />
    </>
  )
}

export default PaypalComponent
