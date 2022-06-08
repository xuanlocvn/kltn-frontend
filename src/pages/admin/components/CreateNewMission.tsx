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

CreateNewMission.propTypes = {}

function CreateNewMission() {
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
    console.log(e.target)
    const missionInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      award: e.target.award.value,
      missionId: e.target.missionId.value,
      maxEntrant: e.target.maxEntrant.value,
      faculty: "Doan Khoa",
      lecturerInCharge: e.target.lecturerInCharge.value,
      lecturerName:
        e.target.lecturerInCharge.options[
          e.target.lecturerInCharge.selectedIndex
        ].text,
      startTime: convertDateToTimestamp(e.target.startTime.value),
      endTime: convertDateToTimestamp(e.target.endTime.value),
      endTimeToRegister: convertDateToTimestamp(
        e.target.endTimeToRegister.value,
      ),
      endTimeToConfirm: convertDateToTimestamp(e.target.endTimeToConfirm.value),
      description: description,
    }
    console.log(missionInfoForm)
    const hash = await AddDataToIPFS(missionInfoForm)
    console.log(hash)
    await managerPoolContractService.createNewMission(
      hash,
      missionInfoForm.missionId,
      missionInfoForm.award,
      missionInfoForm.maxEntrant,
      missionInfoForm.lecturerInCharge,
      missionInfoForm.startTime,
      missionInfoForm.endTimeToRegister,
      missionInfoForm.endTime,
      missionInfoForm.endTimeToConfirm,
    )
  }

  const onEditorStateChange = (editorState) => {
    SetDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="form_body container">
      <div>
        <h2>Tạo nhiệm vụ</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex" onSubmit={handleSubmit}>
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
                Tên nhiệm vụ <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Tên nhiệm vụ"
                name="name"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="missionId">
                Mã nhiệm vụ <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Mã nhiệm vụ"
                name="missionId"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="maxEntrant">
                Số lượng sinh viên tối đa{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                placeholder="Số lượng sinh viên tối đa"
                name="maxEntrant"
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
                  console.log(e.target.value)
                  console.log(e.target.options[e.target.selectedIndex].text)
                }}
              >
                {lecturerList.map((lecturer, index) => (
                  <option key={index} value={lecturer.lecturerAddress}>
                    {lecturer.lecturerName}
                  </option>
                ))}
              </select>
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
                  Kêt thúc
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
            <div className="d-flex justify-content-between row mb-2">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="endTimeToRegister">
                  Kết thúc đăng ký
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian kết thúc đăng ký"
                  name="endTimeToRegister"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="endTimeToConfirm ">
                  Đánh giá
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian kết thúc đánh giá"
                  name="endTimeToConfirm"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="award">
                Phần thưởng <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                placeholder="Phần thưởng"
                name="award"
                required
              />
            </div>
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

export default CreateNewMission
