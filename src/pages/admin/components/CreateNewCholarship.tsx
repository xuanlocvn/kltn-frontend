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

CreateNewScholarShip.propTypes = {}

function CreateNewScholarShip() {
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
    const scholarshipInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      award: e.target.award.value,
      scholarshipId: e.target.scholarshipId.value,
      lecturerInCharge: e.target.lecturerInCharge.value,
      lecturerName:
        e.target.lecturerInCharge.options[
          e.target.lecturerInCharge.selectedIndex
        ].text,
      startTime: convertDateToTimestamp(e.target.startTime.value),
      endTimeToRegister: convertDateToTimestamp(
        e.target.endTimeToRegister.value,
      ),
      endTime: convertDateToTimestamp(e.target.endTime.value),
      endTimeToConfirm: convertDateToTimestamp(e.target.endTimeToConfirm.value),
      description: description,
    }

    console.log(scholarshipInfoForm)
    const hash = await AddDataToIPFS(scholarshipInfoForm)
    console.log(hash)
    await managerPoolContractService.createNewScholarship(
      hash,
      scholarshipInfoForm.scholarshipId,
      scholarshipInfoForm.award,
      scholarshipInfoForm.lecturerInCharge,
      scholarshipInfoForm.startTime,
      scholarshipInfoForm.endTime,
      scholarshipInfoForm.endTimeToRegister,
      scholarshipInfoForm.endTimeToConfirm,
    )
  }

  const onEditorStateChange = (editorState) => {
    SetDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="form_body container">
      <div>
        <h2>Tạo đợt nhận học bổng</h2>
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
                  Tên học bổng <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Tên môn học"
                  name="name"
                  defaultValue={"Học bổng "}
                  required
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label htmlFor="scholarshipId">
                  Mã học bổng <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mã học bổng"
                  name="scholarshipId"
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
                  step="0.01"
                  placeholder="Phần thưởng"
                  name="award"
                  required
                />
              </div>
            </div>
          </div>
          <div className="col col-12">
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

export default CreateNewScholarShip
