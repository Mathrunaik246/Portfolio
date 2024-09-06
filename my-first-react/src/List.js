import React from 'react'

const arr = [1,2,3,4,5];

const List = () => {
  return (
    <>
      {arr.map((a) => (
        <p>{a}</p>
    ))}
    </>
  )
}

export default List
