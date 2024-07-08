import React from 'react'

function ManipulationHeader({id, infos}) {
  return (
    <div className="w-auto h-20  justify-between items-center inline-flex">
      <div className="text-black text-5xl font-bold font-['Roboto'] leading-[62.40px]">
        {id&& (
          <h1>
            Update {infos.service}: {infos.title}{" "}
          </h1>
        )}
        {!id && <h1>New {infos.service}</h1>}
      </div>
    </div>
  )
}

export default ManipulationHeader