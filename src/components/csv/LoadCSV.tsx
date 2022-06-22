import React, { useState } from "react"
import PropTypes from "prop-types"

LoadCSV.propTypes = {
  onLoadCSV: PropTypes.func,
}

export default function LoadCSV(props) {
  const { onLoadCSV } = props
  const [file, setFile] = useState()
  // eslint-disable-next-line no-unused-vars
  const [array, setArray] = useState([])
  const [string, setString] = useState([])

  const fileReader = new FileReader()

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",")
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n")

    const array = csvRows.map((i) => {
      const values = i.split(",")
      const obj = csvHeader.reduce((object, header, index) => {
        //header = header.slice(1, header.length - 1)
        object[header] = values[index] //.slice(1, values[index].length - 1)
        return object
      }, {})
      return obj
    })
    const s: string[] = []
    array.forEach((element) => {
      Object.values(element).forEach((val) => {
        val != "" && s.push(val.toString().slice(0, -1))
      })
    })
    let arr = [...new Set(s)]
    arr = arr.map((a) => a.trim())
    setString(arr)
    onLoadCSV(arr)
    setArray(array)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }
  const handleChange = (e) => {
    const arr: string = e.target.value.split(",")
    let ar = [...new Set(arr)]
    ar = ar.map((a) => a.trim())
    onLoadCSV(ar)
  }

  // const headerKeys = Object.keys(Object.assign({}, ...array))

  return (
    <div style={{ textAlign: "right" }}>
      <textarea
        rows={10}
        cols={160}
        defaultValue={string.toString()}
        onChange={handleChange}
        style={{
          borderRadius: "20px",
          border: "0.1px solid rgba(0,0,0,0.3)",
          padding: "10px",
        }}
      ></textarea>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          style={{ border: "none", borderRadius: "10px" }}
          onClick={(e) => {
            handleOnSubmit(e)
          }}
        >
          Tải lên
        </button>
      </form>
      {/* <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, index) => (
                <td key={index}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
}
