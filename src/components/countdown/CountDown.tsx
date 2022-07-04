import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import "./CountDown.scss"

function Countdown(props) {
  // eslint-disable-next-line react/prop-types
  const { timestamp, size, title } = props
  const [days, setDays] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [style, setStyle] = useState({})
  // eslint-disable-next-line no-undef
  const interval = useRef<any>(0)

  useEffect(() => {
    setStyle({
      fontSize: `${15 * size}px`,
      lineHeight: `${15 * size}px`,
      width: `${50 * size}px`,
      fontWeight: 1000,
      height: `${50 * size}px`,
    })
  }, [])

  useEffect(() => {
    interval.current = setInterval(() => {
      const then: any = timestamp
      const now: any = moment().unix()
      if (then <= now) {
        setDays("00")
        setHours("00")
        setMinutes("00")
        setSeconds("00")
        clearInterval(interval.current)
      } else {
        const countdown = then - now
        const d = Math.floor(countdown / (3600 * 24))
        const h = Math.floor((countdown % (3600 * 24)) / 3600)
        const m = Math.floor((countdown % 3600) / 60)
        const s = Math.floor(countdown % 60)
        const days = d < 10 ? `0${d}` : d.toString()
        const hours = h < 10 ? `0${h}` : h.toString()
        const minutes = m < 10 ? `0${m}` : m.toString()
        const seconds = s < 10 ? `0${s}` : s.toString()
        setDays(days)
        setHours(hours)
        setMinutes(minutes)
        setSeconds(seconds)
      }
    }, 1000)

    return () => {
      clearInterval(interval.current)
    }
  }, [days, hours, minutes, seconds])

  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.6)",
        padding: `${5 * size * size}px 0`,
        borderRadius: `${5 * size * size}px`,
      }}
    >
      <p className="title text-primary text-center">{title}</p>
      <div className="countdown-wrapper">
        {days && (
          <div className="countdown-item" style={{ ...style }}>
            <SVGCircle radius={mapNumber(days, 30, 0, 0, 360)} size={size} />
            {days}
            <span>ngày</span>
          </div>
        )}
        {hours && (
          <div className="countdown-item " style={{ ...style }}>
            <SVGCircle radius={mapNumber(hours, 24, 0, 0, 360)} size={size} />
            {hours}
            <span>giờ</span>
          </div>
        )}
        {minutes && (
          <div className="countdown-item " style={{ ...style }}>
            <SVGCircle radius={mapNumber(minutes, 60, 0, 0, 360)} size={size} />
            {minutes}
            <span>phút</span>
          </div>
        )}
        {seconds && (
          <div className="countdown-item " style={{ ...style }}>
            <SVGCircle radius={mapNumber(seconds, 60, 0, 0, 360)} size={size} />
            {seconds}
            <span>giây</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Countdown

// eslint-disable-next-line react/prop-types
const SVGCircle = ({ radius, size }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#333"
      strokeWidth={2 * size}
      d={describeArc(25 * size, 25 * size, 24 * size, 0, radius)}
    />
  </svg>
)

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ")

  return d
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
