import React from 'react'

const DataTeacherAccount = () => {

}

const TeacherAccounts = () => {

  return (
    <section className="flex flex-col w-full">
      <div className="flex flex-col items-start px-6 py-10 mx-auto w-full bg-white rounded-3xl shadow-[0px_0px_30px_rgba(170,170,170,0.16)] font-semibold gap-y-6">
        <div className="flex space-x-8 text-[20px] justify-between items-center w-full">
          <div>Teacher Accounts</div>
          <div className='flex flex-row items-center gap-x-4'>
            <div className='flex flex-row justify-between items-center px-4 py-2 bg-neutral-100 rounded-xl text-[15px] gap-2 shadow-sm'>
              <input placeholder='Tìm kiếm' className='bg-neutral-100 font-light'/>
            </div>
            <div className='flex flex-row justify-between items-center px-4 py-2 bg-neutral-100 rounded-xl text-[15px] gap-2 shadow-sm'>
              <span className='text-stone-400 font-light'>Short by:</span>
              <select name="sortTeacherAccounts" id="sortTeacherAccounts" className='bg-neutral-100 font-bold'>
                <option value="newestTeacherAccounts">Newest</option>
                <option value="oldestTeacherAccounts">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <table className='table-fixed w-full'>
          <thead>
            <tr className='gap-2'>
              <th>Student ID</th>
              <th>Student name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th className='mr-auto flex justify-end'>
                <button className='bg-green-200 text-green-800 px-4 py-1 rounded-xl font-normal'>Add new</button>
              </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TeacherAccounts