import React, { useEffect, useState } from "react"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import useAvata from "src/hooks/useAvata"
import { AddDataToIPFS } from "src/ipfs/ipfsClient"
import { convertDateToTimestamp } from "src/utils"
import { getLecturerList } from "../../../api/lecturerApi"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"

CreateNewTuition.propTypes = {}

function CreateNewTuition() {
  const [faculty, setFaculty] = useState("")
  const { onChangeAvt, defaultAvt } = useAvata()
  const [lecturerList, setLecturerList] = useState([])
  const [description, SetDescription] = useState("")

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getLecturerList()
      setLecturerList(response.data.result)
    }
    fetchApi()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tuitionInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      tuitionId: e.target.tuitionId.value,
      lecturerInCharge: e.target.lecturerInCharge.value,
      lecturerName:
        e.target.lecturerInCharge.options[
          e.target.lecturerInCharge.selectedIndex
        ].text,
      amountToken: e.target.amountToken.value,
      amountCurency: e.target.amountCurency.value,
      startTime: convertDateToTimestamp(e.target.startTime.value),
      endTime: convertDateToTimestamp(e.target.endTime.value),
      description: description,
    }

    console.log(tuitionInfoForm)
    const hash = await AddDataToIPFS(tuitionInfoForm)
    console.log(hash)
    await managerPoolContractService.createNewTuition(
      hash,
      tuitionInfoForm.tuitionId,
      tuitionInfoForm.amountToken,
      tuitionInfoForm.startTime,
      tuitionInfoForm.endTime,
    )
  }

  const onEditorStateChange = (editorState) => {
    SetDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="form_body container">
      <div>
        <h2>Tạo đợt đóng học phí</h2>
      </div>
      <div className="body_form mt-3">
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="col col-4 img-avt d-flex flex-column align-items-center">
              <label htmlFor="myImage">
                <img src={defaultAvt} alt="" />
                <p>
                  <i>Nhấn để chọn ảnh mới</i>
                </p>
              </label>
              <input
                type="file"
                id="myImage"
                name="myImage"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => onChangeAvt(e)}
              />
            </div>
            <div className="col col-8">
              <div className="d-flex flex-column mb-2">
                <label htmlFor="name">
                  Tên đợt đóng học phí <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tên môn học"
                  name="name"
                  required
                  defaultValue={"Đóng học phí năm học"}
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="tuitionId">
                  Mã đợt đóng học phí <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mã lớp"
                  name="tuitionId"
                  required
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="lecturerInCharge">
                  Người phụ trách chính<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="lecturerInCharge"
                  id="lecturerInCharge"
                  value={faculty}
                  onChange={(e) => {
                    setFaculty(e.target.value)
                  }}
                >
                  {lecturerList.map((lecturer, index) => (
                    <option key={index} value={lecturer.lecturerAddress}>
                      {lecturer.lecturerName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between row mb-2">
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="amountToken">
                    Số token phải thanh toán
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Số token phải thanh toán"
                    name="amountToken"
                    required
                  />
                </div>
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="amountCurency ">
                    Hoặc số tiền cần thanh toán
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Hoặc số tiền cần thanh toán"
                    name="amountCurency"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between row  mb-2">
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="startTime">
                    Bắt đầu
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="datetime-local"
                    placeholder="Thời gian bắt đầu"
                    name="startTime"
                    required
                  />
                </div>
                <div className="d-flex flex-column col col-6">
                  <label htmlFor="endTime">
                    Kết thúc
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="datetime-local"
                    placeholder="Thời gian kết thúc"
                    name="endTime"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="description">
                Mô tả <span style={{ color: "red" }}>*</span>
              </label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  border: "1px solid rgba(0,0,0,0.3)",
                  borderRadius: "20px",
                }}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="submitbtn" type="submit">
                Tạo
              </button>
              <button className="submitbtn cancel_btn">Hủy</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewTuition
