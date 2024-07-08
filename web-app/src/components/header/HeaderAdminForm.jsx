// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useAdminContext } from '../../context/AdminProvider'

// eslint-disable-next-line react/prop-types
function HeaderAdminForm({idAdmin}) {
    const {adminForm} = useAdminContext();
  return (
    <div className="w-auto h-20  justify-between items-center inline-flex">
      <div className="text-black text-5xl font-bold font-['Roboto'] leading-[62.40px]">
        {idAdmin&& (
          <h1>
            Update Admin:  {adminForm.firstname} {adminForm.lastname}{" "}
          </h1>
        )}
        {!idAdmin && <h1>New Admin</h1>}
      </div>
    </div>
  )
}

export default HeaderAdminForm