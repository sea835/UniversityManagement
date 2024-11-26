import React from 'react'

function DynamicModal() {
  const [file, setFile] = useState();

  const uploadImage = (e) => {
    console.log(e.target.files);
  }

  setFile(URL.createObjectURL(e.target.files[0]));

  return (
    <>
      <div className=''>

      </div>
      <div>
        <label>
          Lecturer ID: 
          <input type="text" />
        </label>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text"/>
        </label>
        <label>
          Email:
          <input type="text" />
        </label>
        <label>
          Address:
          <input type="text" />
        </label>
        <label>
          Full Name:
          <input type="text" />
        </label>
        <label>
          Phone Number:
          <input type="number" />
        </label>
        <label>
          Image:
          <input type="file" onchange={uploadImage} />
        </label>
        <label>
          Gender:
          <select>
            <option value="Gender_Male">Male</option>
            <option value="Gender_Female">Female</option>
          </select>
        </label>
        <label>
          Date Of Birth:
          <input type="date" />
        </label>
        <label>
          Specialization: 
          <select>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
            <option value="Specialization_1">Specialization 1</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default DynamicModal